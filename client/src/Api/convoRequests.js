import axios from "axios";

const getBaseUrl = () => {
  let url;
  switch (process.env.NODE_ENV) {
    case "production":
      url = "https://dev-block-api.onrender.com/"
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

export const newMsgSend = (message) => API.post(`/api/message`, message);

export const getFriends = (id) => API.get(`/api/users/friends/${id}`);

export const getTwoUsersConvo = (userId1, userId2) =>
  API.get(`/api/conversation/find/${userId1}/${userId2}`);
