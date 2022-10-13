import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

import "./rightside.scss";
import { images } from "../../constants";
import { Users } from "../../dummy";
import Online from "../online/Online";
import {
  getFriendsList,
  followUser,
  unfollowUser,
} from "../../Api/userRequests";
import { AuthContext } from "../../context/authContext";

const Rightside = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?.id)
  );

  useEffect(() => {
    setFollowed(currentUser.following.includes(user?.id));
  }, [currentUser, user]);

  useEffect(() => {
    const getFriends = async () => {
      if (user) {
        try {
          const friendsList = await getFriendsList(user._id);
          setFriends(friendsList.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFriends();
  }, [user]);

  const followHandler = async () => {
    try {
      if (followed) {
        await unfollowUser(user._id, currentUser._id);
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await followUser(user._id, currentUser._id);
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  };

  const HomeRightside = () => {
    return (
      <>
        <div className="birthday-container">
          <img src={images.birthday} alt="birthday" className="birthday-icon" />
          <span className="birthday-text">
            <b> John </b>and <b> 3 other friends </b> have a birthday today
          </span>
        </div>
        <img className="rightside-ad" src={images.ad} alt="" />
        <h4 className="rightside-title"> Online Friends </h4>
        <ul className="rightside-friends-list">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightside = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightside-follow-button" onClick={followHandler}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightside-title"> Dev info </h4>
        <div className="rightside-info">
          <div className="rightside-info-item">
            <span className="rightside-info-key"> City: </span>
            <span className="rightside-info-value"> {user.city} </span>
          </div>
          <div className="rightside-info-item">
            <span className="rightside-info-key"> From: </span>
            <span className="rightside-info-value"> {user.from} </span>
          </div>
        </div>

        <h4 className="rightside-title"> Connected Devs </h4>
        <div className="rightside-followings">
          {friends.map((friend, ind) => (
            <Link
              to={`/profile/${friend.username}`}
              style={{ textDecoration: "none" }}
              key={ind}
            >
              <div className="rightside-following">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : images.defaultPfp
                  }
                  alt="follower"
                  className="rightside-following-image"
                />
                <span className="rightside-following-name">
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightside">
      <div className="rightside-wrapper">
        {user ? <ProfileRightside /> : <HomeRightside />}
      </div>
    </div>
  );
};

export default Rightside;
