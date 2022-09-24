import { useState, useEffect } from "react";
import { FavoriteBorder, Favorite, MoreVert } from "@mui/icons-material";

import "./post.scss";
import { images } from "../../constants";
import { Users } from "../../dummy";

const Post = ({ post }) => {
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (post) {
      setLike(post.like);
    }
  }, []);

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <>
      {post && (
        <div className="post">
          <div className="post-wrapper">
            <div className="post-wrapper-top">
              <div className="post-top-left">
                <img
                  className="post-pfp"
                  src={
                    Users.filter((user) => user.id === post.id)[0]
                      .profilePicture
                  }
                  alt=""
                />
                <span className="post-username">
                  {Users.filter((user) => user.id === post.id)[0].username}
                </span>
                <span className="post-date"> {post.date} </span>
              </div>
              <div className="post-top-right">
                <MoreVert />
              </div>
            </div>

            <div className="post-wrapper-center">
              <span className="post-text"> {post?.desc} </span>
              <img className="post-image" src={post.photo} alt="" />
            </div>

            <div className="post-wrapper-bottom">
              <div className="post-bottom-left">
                {!isLiked ? (
                  <FavoriteBorder className="like-icon" onClick={likeHandler} />
                ) : (
                  <Favorite className="like-icon" onClick={likeHandler} />
                )}
                <span className="post-like-counter">{like} people like it</span>
              </div>
              <div className="post-bottom-right">
                <span className="post-comment-text">
                  {post.comments} comments
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
