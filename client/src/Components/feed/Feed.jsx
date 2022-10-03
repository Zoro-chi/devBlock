import { useState, useEffect } from "react";

import "./feed.scss";
import { Share, Post } from "../index";
import { getTimelinePosts, getUserPosts } from "../../Api/postRequest";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      const timeline = username
        ? await getUserPosts(username)
        : await getTimelinePosts("632b0b187c118122c34240ea");
      setPosts(timeline.data);
    };
    fetchTimeline();
  }, [username]);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        {posts.map((post, ind) => (
          <Post key={ind} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
