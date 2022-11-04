import "./conversation.scss";
import jane from "../../assets/images/jane.jpg";

const Conversation = () => {
  return (
    <div className="conversation">
      <img src={jane} alt="" className="conversationImg" />
      <span className="conversationName"></span>
    </div>
  );
};

export default Conversation;
