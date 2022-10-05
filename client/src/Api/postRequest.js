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

export const getTimelinePosts = (id) => API.get(`/api/posts/timeline/${id}`);

export const getUserPosts = (username) =>
  API.get(`/api/posts/profile/${username}`);

export const likePost = (id, currentUserId) =>
  API.put(`/api/posts/${id}/like`, { userId: currentUserId });
