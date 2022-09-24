import "./feed.scss";
import { Share, Post } from "../index";
import { Posts } from "../../dummy";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed-wrapper">
        <Share />
        <Post />
        {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
