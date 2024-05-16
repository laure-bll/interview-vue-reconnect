import type UserType from "@/models/User";
import jwtDecode from "jwt-decode";
import { refreshLoginEndpoint } from "./endpoints";
import axios from "axios";
import router from "@/router";

export const accessToken = localStorage.getItem("api_token");

export const getConnectedUser = () => {
  if (accessToken) {
    const user: UserType = jwtDecode(accessToken);

    if (Date.now() >= user?.exp * 1000) {
      router.push("login");
    }

    return user;
  }

  return null;
};

export const refreshToken = async (token: string) => {
  try {
    const res = await axios.post(refreshLoginEndpoint, {
      refreshToken: token,
    });

    const accessToken = JSON.stringify(res.data.token);
    localStorage.setItem("api_token", accessToken);
  } catch (err) {
    router.push("login");
  }
};

export const getAccessToken = () => {
  const user = getConnectedUser();

  if (user) {
    const expiration = user.exp;

    if (Date.now() >= expiration * 1000) {
      refreshToken("refreshToken");
    }

    return `Bearer ${accessToken}`;
  }

  return null;
};
