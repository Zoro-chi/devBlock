import "./profile.scss";
import { Feed, Leftside, Navbar, Rightside } from "../../Components/index";
import { images } from "../../constants";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftside />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img className="profile-cover-image" src={images.post4} alt="" />
              <img className="profile-pfp" src={images.zoro} alt="" />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name"> Zoro </h4>
              <p className="profile-info-desc"> My world!! </p>
            </div>
          </div>

          <div className="profile-right-bottom">
            <Feed />
            <Rightside profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
