import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "";
      break;

    case "development":
    default:
      url = "http://localhost:2121";
  }
  return url;
};

const API = axios.create({
  baseURL: getBaseUrl(),
});

export const login = (userCredentials) =>
  API.post("/api/auth/login", userCredentials);

export const register = (userCredentials) =>
  API.post("/api/auth/register", userCredentials);

