import { FavoriteBorder, Favorite, MoreVert } from "@mui/icons-material";

import "./post.scss";
import { images } from "../../constants";

const Post = () => {
  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-wrapper-top">
          <div className="post-top-left">
            <img className="post-pfp" src={images.john} alt="" />
            <span className="post-username"> Zoro </span>
            <span className="post-date"> 5 mins ago </span>
          </div>
          <div className="post-top-right">
            <MoreVert />
          </div>
        </div>

        <div className="post-wrapper-center">
          <span className="post-text"> My first post! </span>
          <img className="post-image" src={images.post1} alt="" />
        </div>

        <div className="post-wrapper-bottom">
          <div className="post-bottom-left">
            <FavoriteBorder className="like-icon" />
            <span className="post-like-counter"> 44 people like it </span>
          </div>
          <div className="post-bottom-right">
            <span className="post-comment-text"> 4 comments </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
