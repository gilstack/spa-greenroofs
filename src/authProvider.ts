import axios from "axios";
import nookies from "nookies";
import { AuthBindings } from "@refinedev/core";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authProvider: AuthBindings = {
  login: async ({ email, password, remember }) => {
    try {
      // Send a request to your backend to authenticate the user
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });

      const token = response.data;

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Store the user details in cookies
      nookies.set(null, "auth", token, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Invalid username or password",
        },
      };
    }
  },

  logout: async () => {
    nookies.destroy(null, "auth");
    localStorage.removeItem("token");

    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async (ctx: any) => {
    const cookies = nookies.get(ctx);
    if (cookies["auth"]) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
    };
  },

  getPermissions: async () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser.roles;
    }
    return null;
  },

  getIdentity: async () => {
    const auth = nookies.get()["auth"];
    if (auth) {
      const parsedUser = JSON.parse(auth);
      return parsedUser;
    }
    return null;
  },

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
