import "./Chat.scss";
import Navbar from "../../Components/navbar/Navbar";
import Conversation from "../../Components/conversation/Conversation";
import Message from "../../Components/message/Message";
import OnlineChat from "../../Components/onlineChat/OnlineChat";

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
              <Message own={true} />
              <Message />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write a message..."
              ></textarea>
              <button className="chatSubmitBtn"> Send </button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrap">
            <OnlineChat />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
