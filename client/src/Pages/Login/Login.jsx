import { useRef } from "react";

import "./login.scss";

const Login = () => {
  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email.current.value);
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
            <button className="login-button"> Log In </button>
            <span className="login-forgot"> Forgot password? </span>
            <button className="login-register-button">
              Create a new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
