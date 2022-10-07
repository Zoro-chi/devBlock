import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./rightside.scss";
import { images } from "../../constants";
import { Users } from "../../dummy";
import Online from "../online/Online";
import { getFriendsList } from "../../Api/userRequests";

const Rightside = ({ user }) => {
  const [friends, setFriends] = useState([]);

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
  }, [user._id]);

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
