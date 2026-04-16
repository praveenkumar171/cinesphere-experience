// CACHE BUSTER - Force Vercel rebuild: 2026-04-16T10:30:00Z
const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://cinesphere-0rxv.onrender.com";
  }

  const hostname = window.location.hostname;
  console.log("🔍 HOSTNAME DETECTED:", hostname, "| PROTOCOL:", window.location.protocol);

  // ALWAYS use Render backend for ANY hostname that is NOT localhost/127.0.0.1
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    console.log("✅ NON-LOCAL hostname, using Render backend");
    return "https://cinesphere-0rxv.onrender.com";
  }

  // ONLY use localhost for actual localhost
  const localUrl = `http://localhost:5000`;
  console.log("🔗 Local development - Using local backend:", localUrl);
  return localUrl;
};

// IMPORTANT: Always use getDefaultApiBaseUrl() for production
// Environment variables don't work reliably in Vercel builds
export const API_BASE_URL = getDefaultApiBaseUrl();

console.log("📡 FINAL API_BASE_URL:", API_BASE_URL);

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
