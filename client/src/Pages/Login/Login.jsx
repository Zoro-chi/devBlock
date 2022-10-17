import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CircularProgress } from "@mui/material";

import { loginCall, githubCall } from "../../Api/apiCalls";
import { useAuthContext } from "../../context/authContext";

import "./login.scss";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };
  console.log(user);

  const github = (e) => {
    e.preventDefault();
    // githubCall(dispatch);
    window.open("http://localhost:2121/api/auth/github");
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
          <form className="login-box-form" onSubmit={handleSubmit}>
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
            {/* <span className="login-forgot"> Forgot password? </span> */}
            <span className="or-span"> OR </span>
            <button className="login-button" type="button" onClick={github}>
              <GitHubIcon />
            </button>
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
