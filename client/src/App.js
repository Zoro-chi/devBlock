import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.scss";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Chat from "./Pages/Chat/Chat";
import { useAuthContext, AuthContextProvider } from "./context/authContext";

function App() {
  const { user: currentUser, dispatch } = useAuthContext();
  const [user, setUser] = useState(currentUser);

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const getGithubUser = () => {
      fetch("http://localhost:2121/api/auth/github/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status == 200) return response.json();
          throw new Error("Authentication failed");
        })
        .then((resObject) => {
          // localStorage.setItem("user", JSON.stringify(resObject.user));
          dispatch({ type: "LOGIN_SUCCESS", payload: resObject.user });
          // setUser(resObject.user);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getGithubUser();
  }, [currentUser]);

  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
          <Route path="/chat" element={user ? <Chat /> : <Navigate to="/" />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
