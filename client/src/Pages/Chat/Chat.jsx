import "./Chat.scss";
import Navbar from "../../Components/navbar/Navbar";
import Conversation from "../../Components/conversation/Conversation";
import Message from "../../Components/message/Message";

const Chat = () => {
  return (
    <>
      <Navbar />
      <div className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrap">
            <input placeholder="Find Connects" className="chatMenuInput" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrap">
            <div className="chatBoxTop">
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatBoxBottom"></div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrap"></div>
        </div>
      </div>
    </>
  );
};

export default Chat;
