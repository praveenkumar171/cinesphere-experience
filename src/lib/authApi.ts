import type { User } from "@/context/AuthContext";
import { apiUrl } from "@/lib/api";

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

const parseError = async (response: Response) => {
  try {
    const data = (await response.json()) as { message?: string };
    return data.message || "Request failed";
  } catch {
    return `Request failed with status ${response.status}`;
  }
};

export const signupRequest = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  try {
    const url = apiUrl("/api/auth/signup");
    console.log("📤 Signup request to:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "omit",
      cache: "no-store",
    });

    console.log("📥 Signup response:", response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as AuthResponse;
  } catch (error) {
    console.error("❌ Signup error:", error);
    if (error instanceof TypeError) {
      throw new Error("Network error: Could not connect to server. Please check your internet connection.");
    }
    throw error;
  }
};

export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const url = apiUrl("/api/auth/login");
    console.log("📤 Login request to:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "omit",
      cache: "no-store",
    });

    console.log("📥 Login response:", response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as AuthResponse;
  } catch (error) {
    console.error("❌ Login error:", error);
    if (error instanceof TypeError) {
      throw new Error("Network error: Could not connect to server. Please check your internet connection.");
    }
    throw error;
  }
};

export const refreshTokenRequest = async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
  try {
    const url = apiUrl("/api/auth/refresh");
    console.log("🔄 Refresh token request to:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: refreshToken }),
      credentials: "omit",
      cache: "no-store",
    });

    console.log("📥 Refresh token response:", response.status, response.statusText);
    
    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as { accessToken: string; refreshToken: string };
  } catch (error) {
    console.error("❌ Refresh token error:", error);
    throw error;
  }
};
