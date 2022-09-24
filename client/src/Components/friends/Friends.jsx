import "./friends.scss";

const Friends = ({ user }) => {
  return (
    <li className="leftside-freind">
      <img
        src={user.profilePicture}
        alt="profile"
        className="leftside-freind-pfp"
      />
      <span className="letside-freind-name"> {user.username} </span>
    </li>
  );
};

export default Friends;
