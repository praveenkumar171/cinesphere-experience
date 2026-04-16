const getDefaultApiBaseUrl = () => {
  if (typeof window === "undefined") {
    return "https://cinesphere-0rxv.onrender.com";
  }

  // In production on Vercel, use Render backend
  if (window.location.hostname.includes("vercel.app")) {
    return "https://cinesphere-0rxv.onrender.com";
  }

  // Fallback for local development
  return `${window.location.protocol}//${window.location.hostname}:5000`;
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || getDefaultApiBaseUrl();

export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;
