import { useState, useEffect, useRef } from "react";

import "./Chat.scss";
import Navbar from "../../Components/navbar/Navbar";
import Conversation from "../../Components/conversation/Conversation";
import Message from "../../Components/message/Message";
import OnlineChat from "../../Components/onlineChat/OnlineChat";
import { useAuthContext } from "../../context/authContext";
import {
  getConversations,
  getMessages,
  newMsgSend,
} from "../../Api/convoRequests";
import { io } from "socket.io-client";

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [chat, setChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const socket = useRef(io("ws://localhost:2244"));
  const latestMsgScroll = useRef();
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

  // SCROLLS CHAT MESSAGES TO CURRENT MESSAGE
  useEffect(() => {
    latestMsgScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current.emit("sendUser", user._id);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  // STOPS SOCKET FROM CONNECTING MULTIPLE TIMES
  useEffect(() => {
    socket.current = io("ws://localhost:2244");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: chat._id,
    };

    try {
      const res = await newMsgSend(message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

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
                    <div ref={latestMsgScroll}>
                      <Message
                        message={msg}
                        key={ind}
                        own={msg.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button className="chatSubmitBtn" onClick={handleSubmit}>
                    {" "}
                    Send{" "}
                  </button>
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
