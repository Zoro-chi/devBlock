import { useEffect, useState } from "react";

import "./conversation.scss";
import { images } from "../../constants/index";
import { getUserById } from "../../Api/userRequests";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await getUserById(friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={user?.profilePicture ? user.profilePicture : images.defaultPfp}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName"> {user?.username} </span>
    </div>
  );
};

export default Conversation;
