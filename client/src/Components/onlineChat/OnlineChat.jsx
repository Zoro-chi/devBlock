import "./onlineChat.scss";
import jane from "../../assets/images/jane.jpg";

const OnlineChat = () => {
  return (
    <div className="onlineChat">
      <div className="onlineChatFriends">
        <div className="onlineChatImgContainer">
          <img src={jane} alt="" className="onlineChatImg" />
          <div className="onlineChatBadge"></div>
        </div>
        <span className="onlineChatName"> John </span>
      </div>

      <div className="onlineChatFriends">
        <div className="onlineChatImgContainer">
          <img src={jane} alt="" className="onlineChatImg" />
          <div className="onlineChatBadge"></div>
        </div>
        <span className="onlineChatName"> John </span>
      </div>

      <div className="onlineChatFriends">
        <div className="onlineChatImgContainer">
          <img src={jane} alt="" className="onlineChatImg" />
          <div className="onlineChatBadge"></div>
        </div>
        <span className="onlineChatName"> John </span>
      </div>
    </div>
  );
};

export default OnlineChat;
