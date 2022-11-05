import { useEffect, useState } from "react";

import "./conversation.scss";
import defaultPfp from "../../assets/images/defaultPfp.jpg";
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
        src={user?.profilePicture ? user.profilePicture : defaultPfp}
        alt=""
        className="conversationImg"
      />
      <span className="conversationName"> {user?.username} </span>
    </div>
  );
};

export default Conversation;
