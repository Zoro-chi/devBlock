import { useState, useEffect } from "react";
import axios from "axios";

import "./feed.scss";
import { Share, Post } from "../index";
import { getTimelinePosts } from "../../Api/postRequest";
// import { Posts } from "../../dummy";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      const timeline = await getTimelinePosts("632b0b187c118122c34240ea");
      console.log(timeline.data);
    };
    fetchTimeline();
  }, []);

  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        <Post />
        {/* {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))} */}
      </div>
    </div>
  );
};

export default Feed;
