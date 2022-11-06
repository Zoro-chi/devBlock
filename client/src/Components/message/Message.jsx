import { format } from "timeago.js";

import "./message.scss";
import { images } from "../../constants/index";

const Message = ({ own, message }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src={images.jane} alt="" className="messageImg" />
        <p className="messageTxt">{message.text}</p>
      </div>
      <div className="messageBottom"> {format(message.createdAt)} </div>
    </div>
  );
};

export default Message;
