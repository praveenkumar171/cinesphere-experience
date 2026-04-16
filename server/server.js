const app = require("./src/app");
const { PORT, NODE_ENV } = require("./src/config/env");
const { connectToDatabase, seedTheatresIfEmpty } = require("./src/config/db");

const startServer = async () => {
  try {
    await connectToDatabase();
    await seedTheatresIfEmpty();

    app.listen(PORT, () => {
      console.log(`\n🎬 CineSphere API running on http://localhost:${PORT}`);
      console.log(`   Environment: ${NODE_ENV}\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
