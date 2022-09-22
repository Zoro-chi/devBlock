import "./home.scss";
import { Feed, Leftside, Navbar, Rightside } from "../../Components/index";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <Leftside />
        <Feed />
        <Rightside />
      </div>
    </>
  );
};

export default Home;
