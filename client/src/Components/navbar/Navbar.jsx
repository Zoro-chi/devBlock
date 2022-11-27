import { useContext } from "react";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";

import "./navbar.scss";
import { images } from "../../constants";
import { useAuthContext } from "../../context/authContext";
import { deleteCookies } from "../../utils";
import { logout } from "../../Api/authRequests";

const Navbar = () => {
  const { user, dispatch } = useAuthContext();
  // console.log(user);

  const handleLogout = () => {
    // remove user from local storage
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    logout();
    // window.location.reload();
  };

  return (
    <div className="navbar-container">
      <nav className="navbar-left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            dev<span>Block</span>
          </span>
        </Link>
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
          <Link to={`/`} className="link-component">
            <span className="navbar-link"> Timeline </span>
          </Link>
        </div>

        <div className="navbar-icons">
          <div className="navbar-icon-item">
            <Person />
            <span className="navbar-icon-counter"> 1 </span>
          </div>
          <div className="navbar-icon-item">
            <Link to={"/chat"} className="link-component">
              <Chat />
            </Link>
            <span className="navbar-icon-counter"> 2 </span>
          </div>
          <div className="navbar-icon-item">
            <Notifications />
            <span className="navbar-icon-counter"> 3 </span>
          </div>
        </div>

        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture ? user.profilePicture : images.defaultPfp}
            alt="profile"
            className="navbar-img"
          />
        </Link>

        <span className="logout" onClick={handleLogout}>
          {" "}
          Logout{" "}
        </span>
      </nav>
    </div>
  );
};

export default Navbar;
