const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const { movies } = require("../src/data/store");
const { cloudinary, isCloudinaryConfigured } = require("../src/services/cloudinary");

if (!isCloudinaryConfigured()) {
  console.error("Cloudinary is not configured in server/.env");
  process.exit(1);
}

const rootDir = path.resolve(__dirname, "../..");
const publicDir = path.join(rootDir, "public");

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const resolveSource = (url) => {
  if (url.startsWith("/")) {
    return path.join(publicDir, url.slice(1));
  }
  return url;
};

const uploadImage = async (movie, fieldName, oldUrl) => {
  const source = resolveSource(oldUrl);

  if (source.startsWith(publicDir) && !fs.existsSync(source)) {
    throw new Error(`Missing local file: ${source}`);
  }

  const publicId = `cinesphere/movies/${slugify(movie.title)}-${fieldName}`;
  const result = await cloudinary.uploader.upload(source, {
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });

  return result.secure_url;
};

const replaceInFile = (filePath, replacements) => {
  let content = fs.readFileSync(filePath, "utf8");

  for (const { oldUrl, newUrl } of replacements) {
    content = content.split(`"${oldUrl}"`).join(`"${newUrl}"`);
  }

  fs.writeFileSync(filePath, content, "utf8");
};

const run = async () => {
  const replacements = [];

  for (const movie of movies) {
    const posterNewUrl = await uploadImage(movie, "poster", movie.posterUrl);
    replacements.push({ oldUrl: movie.posterUrl, newUrl: posterNewUrl });

    const bannerNewUrl = await uploadImage(movie, "banner", movie.bannerUrl);
    replacements.push({ oldUrl: movie.bannerUrl, newUrl: bannerNewUrl });

    console.log(`Migrated images for: ${movie.title}`);
  }

  const uniqueReplacements = Array.from(
    new Map(replacements.map((item) => [item.oldUrl, item])).values()
  );

  replaceInFile(path.join(rootDir, "src/data/movies.ts"), uniqueReplacements);
  replaceInFile(path.join(rootDir, "server/src/data/store.js"), uniqueReplacements);

  console.log("Movie image URLs updated in frontend and backend data files.");
};

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
