import { images } from "./constants";

export const Users = [
  {
    id: 1,
    profilePicture: images.zoro,
    username: "Zoro",
  },
  {
    id: 2,
    profilePicture: images.zara,
    username: "Zara",
  },
  {
    id: 3,
    profilePicture: images.jane,
    username: "Jane",
  },
  {
    id: 4,
    profilePicture: images.john,
    username: "John",
  },
  {
    id: 5,
    profilePicture: images.defaultPfp,
    username: "Paul",
  },
];

export const Posts = [
  {
    id: 1,
    desc: "Love to code",
    photo: images.post1,
    date: "5mins ago",
    userId: 1,
    like: 32,
    comments: 9,
  },
  {
    id: 2,
    desc: "Come on you Gunnersss!",
    photo: images.post2,
    date: "15mins ago",
    userId: 2,
    like: 2,
    comments: 1,
  },
  {
    id: 3,
    desc: "My first post",
    photo: images.post3,
    date: "20mins ago",
    userId: 3,
    like: 2,
    comments: 0,
  },
  {
    id: 4,
    desc: "Blockchain ledgers are so interesting",
    photo: images.post4,
    date: "55mins ago",
    userId: 1,
    like: 15,
    comments: 2,
  },
];
