import "./message.scss";

const Message = ({ own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="../../assets/jane.jpg" alt="" className="messageImg" />
        <p className="messageTxt"> Hello this is a message </p>
      </div>
      <div className="messageBottom"> 1 hour ago </div>
    </div>
  );
};

export default Message;
