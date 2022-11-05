import { useState, useEffect } from "react";

import "./Chat.scss";
import Navbar from "../../Components/navbar/Navbar";
import Conversation from "../../Components/conversation/Conversation";
import Message from "../../Components/message/Message";
import OnlineChat from "../../Components/onlineChat/OnlineChat";
import { useAuthContext } from "../../context/authContext";
import { getConversations, getMessages } from "../../Api/convoRequests";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const getConvos = async () => {
      try {
        const res = await getConversations(user._id);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConvos();
  }, [user._id]);

  useEffect(() => {
    const getMsgs = async () => {
      try {
        const res = await getMessages(chat?._id);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMsgs();
  }, [chat]);

  return (
    <>
      <Navbar />
      <div className="chat">
        <div className="chatMenu">
          <div className="chatMenuWrap">
            <input placeholder="Find Connects" className="chatMenuInput" />
            {conversations.map((convo, ind) => (
              <div onClick={() => setChat(convo)} key={ind}>
                <Conversation conversation={convo} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrap">
            {chat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((msg, ind) => (
                    <Message
                      message={msg}
                      key={ind}
                      own={msg.sender === user._id}
                    />
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write a message..."
                  ></textarea>
                  <button className="chatSubmitBtn"> Send </button>
                </div>
              </>
            ) : (
              <span className="startConvo">
                Start your legendary conversation
              </span>
            )}
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
