import "./message.scss";
import jane from "../../assets/images/jane.jpg";

const Message = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={jane} alt="" className="messageImg" />
        <p className="messageTxt">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Et placeat
          incidunt sint?
        </p>
      </div>
      <div className="messageBottom"> 1 hour ago </div>
    </div>
  );
};

export default Message;
