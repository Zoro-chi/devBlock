import { useState, useEffect } from "react";

import "./onlineChat.scss";
import { images } from "../../constants";
import { getFriends, getTwoUsersConvo } from "../../Api/convoRequests";

const OnlineChat = ({ onlineFriends, currentUser, setChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFrd, setOnlineFrd] = useState([]);

  const handleClick = async (user) => {
    try {
      const res = await getTwoUsersConvo(user._id, currentUser);
      setChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getFrnds = async () => {
      const res = await getFriends(currentUser);
      setFriends(res.data);
    };
    getFrnds();
  }, [currentUser]);

  useEffect(() => {
    setOnlineFrd(
      friends.filter((friend) => onlineFriends.includes(friend._id))
    );
  }, [onlineFriends, friends]);

  return (
    <div className="onlineChat">
      {onlineFrd.map((friend, ind) => (
        <div
          className="onlineChatFriends"
          key={ind}
          onClick={() => handleClick(friend)}
        >
          <div className="onlineChatImgContainer">
            <img
              src={
                friend?.profilePicture
                  ? friend.profilePicture
                  : images.defaultPfp
              }
              alt=""
              className="onlineChatImg"
            />
            <div className="onlineChatBadge"></div>
          </div>
          <span className="onlineChatName"> {friend?.username} </span>
        </div>
      ))}
    </div>
  );
};

export default OnlineChat;
