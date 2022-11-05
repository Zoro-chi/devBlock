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

export const getConversations = (userId) =>
  API.get(`/api/conversation/${userId}`);

export const getMessages = (chatId) => API.get(`/api/message/${chatId}`);
