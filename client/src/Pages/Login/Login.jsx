import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

import { loginCall } from "../../Api/apiCalls";
import { AuthContext } from "../../context/authContext";

import "./login.scss";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);

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
              type="email"
              placeholder="Email"
              className="login-input"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              ref={password}
              required
              minLength={6}
            />
            <button
              className="login-button"
              type="submit"
              disabled={isFetching}
            >
              {isFetching ? <CircularProgress size="20px" /> : "Log In"}
            </button>
            <span className="login-forgot"> Forgot password? </span>
            {/* {isFetching ? (
              <button
                className="login-register-button"
                style={{
                  color: "mediumspringgreen",
                  backgroundColor: "#f4f8fa",
                }}
              >
                Create new account
              </button>
            ) : (
              <button className="login-register-button">
                Create new account
              </button>
            )} */}
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <p className="register">Create a new account</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
