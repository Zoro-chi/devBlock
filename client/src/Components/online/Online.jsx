import "./online.scss";

const Online = ({ user }) => {
  return (
    <li className="rightside-friend">
      <div className="rightside-profile-image-container">
        <img
          className="rightside-profile-image"
          src={user.profilePicture}
          alt="profile"
        />
        <span className="rightside-online"></span>
      </div>
      <span className="rightside-username"> {user.username} </span>
    </li>
  );
};

export default Online;
