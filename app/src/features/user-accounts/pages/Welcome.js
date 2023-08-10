import "../styles/welcome.css";
import { Link } from "react-router-dom";
import Logo from "../../../components/logo/Logo";

const Welcome = () => {
  return (
    <div className="welcome-screen">
      <div className="welcome-page">
        <main className="mainContent">
          <div className="title-container">
            <div className="mainTitle">
              <h1>Welcome to</h1> <Logo />
            </div>
          </div>
          <p className="subTitle">
            <span>Flix</span> your time
          </p>
          <p className="readyToWatch">
            Ready to watch? Login or Signup to start <span>flixx</span>ing
          </p>
          <div className="buttonsContainer">
            <Link to="/login" className="navLinkButton">
              Login
            </Link>
            <Link to="/signup" className="navLinkButton">
              Signup
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Welcome;
