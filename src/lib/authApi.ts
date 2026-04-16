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
    const response = await fetch(apiUrl("/api/auth/signup"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "omit",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as AuthResponse;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Could not connect to server. Please check your internet connection.");
    }
    throw error;
  }
};

export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(apiUrl("/api/auth/login"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "omit",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(await parseError(response));
    }

    return (await response.json()) as AuthResponse;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: Could not connect to server. Please check your internet connection.");
    }
    throw error;
  }
};
