import { useState, useEffect, useContext } from "react";

import "./feed.scss";
import { Share, Post } from "../index";
import { getTimelinePosts, getUserPosts } from "../../Api/postRequest";
import { AuthContext } from "../../context/authContext";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTimeline = async () => {
      const timeline = username
        ? await getUserPosts(username)
        : await getTimelinePosts(user._id);
      setPosts(timeline.data);
    };
    fetchTimeline();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        {username == user.username && <Share />}
        {posts.map((post, ind) => (
          <Post key={ind} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
