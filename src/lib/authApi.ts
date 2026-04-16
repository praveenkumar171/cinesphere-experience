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
  const response = await fetch(apiUrl("/api/auth/signup"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as AuthResponse;
};

export const loginRequest = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await fetch(apiUrl("/api/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return (await response.json()) as AuthResponse;
};
