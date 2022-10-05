import { useState, useEffect, useContext } from "react";
import { FavoriteBorder, Favorite, MoreVert } from "@mui/icons-material";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import "./post.scss";
import { getUserById } from "../../Api/userRequests";
import { likePost } from "../../Api/postRequest";
import { images } from "../../constants";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserById(post.userId);
      setUser(user.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      likePost(post._id, currentUser._id);
    } catch (error) {}
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
                <Link to={`profile/${user.username}`}>
                  <img
                    className="post-pfp"
                    src={user.profilePicture || images.defaultPfp}
                    alt=""
                  />
                </Link>
                <span className="post-username">{user.username}</span>
                <span className="post-date"> {format(post.createdAt)} </span>
              </div>
              <div className="post-top-right">
                <MoreVert />
              </div>
            </div>

            <div className="post-wrapper-center">
              <span className="post-text"> {post?.desc} </span>
              <img className="post-image" src={post?.img} alt="" />
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
