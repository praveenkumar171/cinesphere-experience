const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://cinesphere-0rxv.onrender.com";
  }

  // In production on Vercel, use Render backend
  if (
    window.location.hostname.includes("vercel.app") ||
    window.location.hostname.includes("cinesphere-experience.vercel.app")
  ) {
    console.log("🔗 Production (Vercel) - Using Render backend");
    return "https://cinesphere-0rxv.onrender.com";
  }

  // Fallback for local development
  const localUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
  console.log("🔗 Local development - Using local backend:", localUrl);
  return localUrl;
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || getDefaultApiBaseUrl();

console.log("📡 API_BASE_URL:", API_BASE_URL, "| VITE_API_URL:", import.meta.env.VITE_API_URL);

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
