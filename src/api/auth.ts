import type UserType from "@/models/User";
import jwtDecode from "jwt-decode";
import { refreshLoginEndpoint } from "./endpoints";
import axios from "axios";
import router from "@/router";

export const ACCESS_TOKEN_KEY = "api_token";
export const REFRESH_TOKEN_KEY = "api_rtoken";

export const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
export const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

export const getConnectedUser = () => {
  if (accessToken) {
    const user: UserType = jwtDecode(accessToken);

    if (user?.exp) {
      const currentDateTime = new Date();
      const expirationDatetime = new Date(user?.exp * 1000);

      if (currentDateTime < expirationDatetime) {
        return user;
      }
    }
  }
  if (refreshToken) {
    refreshingToken();
  }

  return null;
};

export const refreshingToken = async () => {
  try {
    if (refreshToken) {
      const res = await axios.post(refreshLoginEndpoint, {
        refresh_token: JSON.parse(refreshToken),
      });

      const token = res.data.token;

      const newAccessToken = JSON.stringify(token);
      localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);
      router.push({ name: "dashboard" });
    } else {
      logout();
    }
  } catch (err) {
    logout();
  }
};

export const logout = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.location.href = "/login";
};
