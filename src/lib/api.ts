const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://cinesphere-0rxv.onrender.com";
  }

  const hostname = window.location.hostname;
  
  // ALWAYS use Render backend for any production deployment
  if (hostname.includes("vercel.app") || hostname.includes("netlify.app")) {
    console.log("🔗 Cloud deployment (Vercel/Netlify) - Using Render backend");
    return "https://cinesphere-0rxv.onrender.com";
  }
  
  // For localhost development, use local backend
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    const localUrl = `http://localhost:5000`;
    console.log("🔗 Local development - Using local backend:", localUrl);
    return localUrl;
  }

  // For LAN/IP development
  if (hostname.match(/^192\.168\./) || hostname.match(/^172\./)) {
    const lanUrl = `http://${hostname}:5000`;
    console.log("🔗 LAN development - Using local backend:", lanUrl);
    return lanUrl;
  }

  // Default to Render for any other production domain
  console.log("🔗 Production domain - Using Render backend");
  return "https://cinesphere-0rxv.onrender.com";
};

// IMPORTANT: Always use getDefaultApiBaseUrl() for production
// Environment variables don't work reliably in Vercel builds
export const API_BASE_URL = getDefaultApiBaseUrl();

console.log("📡 API_BASE_URL:", API_BASE_URL, "| Hostname:", typeof window !== "undefined" ? window.location.hostname : "SSR");

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
