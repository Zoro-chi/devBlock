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
	const [incomingMsg, setIncomingMsg] = useState(null);
	const [onlineFriends, setOnlineFriends] = useState([]);
	const socket = useRef();
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

	// CONNECTS SOCKET TO APP
	useEffect(() => {
		// ! FOR DEV ENV
		// socket.current = io("ws://localhost:2244");
		socket.current = io("https://dev-block-api.onrender.com/");
		socket.current.on("getMsg", (data) => {
			setIncomingMsg({
				sender: data.senderId,
				text: data.txt,
				createdAt: Date.now(),
			});
		});
	}, []);

	useEffect(() => {
		incomingMsg &&
			chat?.members.includes(incomingMsg.sender) &&
			setMessages((prev) => [...prev, incomingMsg]);
	}, [chat, incomingMsg]);

	useEffect(() => {
		socket.current.emit("sendUser", user._id);
		socket.current.on("getUsers", (users) => {
			setOnlineFriends(
				user.following.filter((follower) =>
					users.some((u) => u.userId === follower)
				)
			);
		});
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: chat._id,
		};

		const receiverId = chat.members.find((member) => member !== user._id);

		socket.current.emit("sendMsg", {
			senderId: user._id,
			receiverId,
			txt: newMessage,
		});

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
										<div ref={latestMsgScroll} key={ind}>
											<Message message={msg} own={msg.sender === user._id} />
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
										Send
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
						<OnlineChat
							onlineFriends={onlineFriends}
							currentUser={user._id}
							setChat={setChat}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
