import { API } from "./api";


export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return API.post("/auth/register", data);
};

export const loginUser = (data: {
  email: string;
  password: string;
}) => {
  return API.post("/auth/login", data);
};

export const logoutUser = () => {
  return API.post("/auth/logout");
};

export const getCurrentUser = () => {
  return API.get("/auth/me");
};