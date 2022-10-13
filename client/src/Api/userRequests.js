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

export const getUserByName = (username) =>
  API.get(`/api/users?username=${username}`);

export const getUserById = (id) => API.get(`/api/users?userId=${id}`);

export const getFriendsList = (id) => API.get(`/api/users/friends/${id}`);

export const followUser = (id, currentUserId) =>
  API.put(`/api/users/${id}/follow`, { userId: currentUserId });

export const unfollowUser = (id, currentUserId) =>
  API.put(`/api/users/${id}/unfollow`, { userId: currentUserId });
