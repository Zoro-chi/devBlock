import "./share.scss";
import { images } from "../../constants";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";

const Share = () => {
  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img className="share-pfp" src={images.post1} alt="" />
          <input className="share-input" placeholder="What it do, Zoro?" />
        </div>
        <hr className="share-hr" />
        <div className="share-bottom">
          <div className="share-options">
            <div className="share-option">
              <PermMedia htmlColor="tomato" className="share-icon" />
              <span className="share-option-text"> Photo or Video </span>
            </div>

            <div className="share-option">
              <Label htmlColor="aquamarine" className="share-icon" />
              <span className="share-option-text"> Tag </span>
            </div>

            <div className="share-option">
              <Room htmlColor="midnightblue" className="share-icon" />
              <span className="share-option-text"> Location </span>
            </div>

            <div className="share-option">
              <EmojiEmotions htmlColor="goldenrod" className="share-icon" />
              <span className="share-option-text"> Feelings </span>
            </div>
          </div>
          <button className="share-button"> Share </button>
        </div>
      </div>
    </div>
  );
};

export default Share;
