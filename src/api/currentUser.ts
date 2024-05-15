import type UserType from "@/models/User";
import jwtDecode from "jwt-decode";

const getConnectedUser = () => {
  const token = localStorage.getItem("api_token");

  if (token) {
    const user: UserType = jwtDecode(token);
    return user;
  }

  return null;
};

export default getConnectedUser;
