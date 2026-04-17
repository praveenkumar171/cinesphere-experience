console.log("🚀 API Config Loading - Current hostname:", typeof window !== "undefined" ? window.location.hostname : "SSR");

let API_BASE_URL: string;

if (typeof window === "undefined") {
  // Server-side rendering
  API_BASE_URL = "https://cinesphere-0rxv.onrender.com";
} else if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  // Local development
  API_BASE_URL = "http://localhost:5000";
  console.log("🔗 LOCAL DEVELOPMENT MODE - Using localhost backend");
} else {
  // ANY other domain (production) - use Render backend
  API_BASE_URL = "https://cinesphere-0rxv.onrender.com";
  console.log("🌐 PRODUCTION MODE - Using Render backend:", API_BASE_URL);
}

console.log("📡 FINAL API_BASE_URL:", API_BASE_URL);

export { API_BASE_URL };
export const apiUrl = (path: string) => {
  const fullUrl = `${API_BASE_URL}${path}`;
  console.log("📤 API Call:", fullUrl);
  return fullUrl;
};
