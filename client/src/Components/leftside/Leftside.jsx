import {
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleFilledOutlined,
  RssFeed,
  School,
  WorkOutline,
} from "@mui/icons-material";

import "./leftside.scss";
import { images } from "../../constants";

const Leftside = () => {
  return (
    <div className="leftside">
      <div className="leftside-wrapper">
        <ul className="leftside-list">
          <li className="leftside-list-item">
            <RssFeed className="left-side-icon" />
            <span className="leftside-list-item-text"> Feed </span>
          </li>
          <li className="leftside-list-item">
            <Chat className="left-side-icon" />
            <span className="leftside-list-item-text"> Chat </span>
          </li>
          <li className="leftside-list-item">
            <PlayCircleFilledOutlined className="left-side-icon" />
            <span className="leftside-list-item-text"> Videos </span>
          </li>
          <li className="leftside-list-item">
            <Group className="left-side-icon" />
            <span className="leftside-list-item-text"> Groups </span>
          </li>
          <li className="leftside-list-item">
            <HelpOutline className="left-side-icon" />
            <span className="leftside-list-item-text"> Questions </span>
          </li>
          <li className="leftside-list-item">
            <WorkOutline className="left-side-icon" />
            <span className="leftside-list-item-text"> Jobs </span>
          </li>
          <li className="leftside-list-item">
            <Event className="left-side-icon" />
            <span className="leftside-list-item-text"> Events </span>
          </li>
          <li className="leftside-list-item">
            <School className="left-side-icon" />
            <span className="leftside-list-item-text"> Courses </span>
          </li>
        </ul>
        <button className="leftside-button"> Show more </button>
        <hr className="leftside-hr" />
        <ul className="leftside-freinds-list">
          <li className="leftside-freind">
            <img
              src={images.john}
              alt="profile"
              className="leftside-freind-pfp"
            />
            <span className="letside-freind-name"> John Doe </span>
          </li>
          <li className="leftside-freind">
            <img
              src={images.defaultPfp}
              alt="profile"
              className="leftside-freind-pfp"
            />
            <span className="letside-freind-name"> Tom Bigglesworth </span>
          </li>
          <li className="leftside-freind">
            <img
              src={images.zoro}
              alt="profile"
              className="leftside-freind-pfp"
            />
            <span className="letside-freind-name"> Zoro 0x </span>
          </li>
          <li className="leftside-freind">
            <img
              src={images.zara}
              alt="profile"
              className="leftside-freind-pfp"
            />
            <span className="letside-freind-name"> Zara fang </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Leftside;
