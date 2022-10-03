import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./profile.scss";
import { Feed, Leftside, Navbar, Rightside } from "../../Components/index";
import { images } from "../../constants";
import { getUser } from "../../Api/userRequests";

const Profile = () => {
  const [user, setUser] = useState({});
  const username = useParams().username;
  console.log(username);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser("Zoro");
      setUser(user.data);
    };
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile">
        <Leftside />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img
                className="profile-cover-image"
                src={user.coverPicture || images.defaultCover}
                alt=""
              />
              <img
                className="profile-pfp"
                src={user.profilePicture || images.defaultPfp}
                alt=""
              />
            </div>
            <div className="profile-info">
              <h4 className="profile-info-name"> {user.username} </h4>
              <p className="profile-info-desc"> {user.desc} </p>
            </div>
          </div>

          <div className="profile-right-bottom">
            <Feed username={username} />
            <Rightside user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
