import { Search, Person, Chat, Notifications } from "@mui/icons-material";

import "./navbar.scss";
import { images } from "../../constants";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar-left">
        <span className="logo">
          dev<span>Block</span>
        </span>
      </nav>

      <nav className="navbar-center">
        <div className="searchbar">
          <Search className="search-icon" />
          <input
            placeholder="Search for dev, post or work"
            className="search-input"
          />
        </div>
      </nav>

      <nav className="navbar-right">
        <div className="navbar-links">
          <span className="navbar-link"> Homepage </span>
          <span className="navbar-link"> Timeline </span>
        </div>

        <div className="navbar-icons">
          <div className="navbar-icon-item">
            <Person />
            <span className="navbar-icon-counter"> 1 </span>
          </div>
          <div className="navbar-icon-item">
            <Chat />
            <span className="navbar-icon-counter"> 2 </span>
          </div>
          <div className="navbar-icon-item">
            <Notifications />
            <span className="navbar-icon-counter"> 3 </span>
          </div>
        </div>

        <img src={images.jane} alt="profile" className="navbar-img" />
      </nav>
    </div>
  );
};

export default Navbar;
