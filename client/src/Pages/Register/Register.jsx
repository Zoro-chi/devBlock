import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

import "./register.scss";
import { register } from "../../Api/authRequests";

const Register = () => {
  const email = useRef();
  const username = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity("Passwords don't match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await register(user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo"> devBlock </h3>
          <span className="login-desc">
            Connect with different developers around the globe!
          </span>
        </div>

        <div className="login-right">
          <form className="login-box" onSubmit={handleSubmit}>
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="login-input"
              required
              ref={username}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="login-input"
              required
              ref={email}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="login-input"
              required
              minLength={6}
              ref={password}
            />
            <input
              name="passwordAgain"
              type="password"
              placeholder="Password again"
              className="login-input"
              required
              minLength={6}
              ref={passwordAgain}
            />
            <button className="login-button" type="submit">
              Sign Up
            </button>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <p className="have-account">Already have an account? Log In</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
