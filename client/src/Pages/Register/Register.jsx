import "./register.scss";

const Register = () => {
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo"> devBlock </h3>
          <span className="login-desc">
            Connect with different developers around the globe!{" "}
          </span>
        </div>

        <div className="login-right">
          <div className="login-box">
            <input type="text" placeholder="Username" className="login-input" />
            <input type="email" placeholder="Email" className="login-input" />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password again"
              className="login-input"
            />
            <button className="login-button"> Sign Up </button>
            <button className="login-register-button">Log In</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
