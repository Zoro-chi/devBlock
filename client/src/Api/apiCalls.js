import { login } from "./authRequests";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await login(userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    localStorage.setItem("user", JSON.stringify(res.data));
    window.location.reload();
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};

export const getGithubUser = (dispatch) => {
  try {
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
        localStorage.setItem("user", JSON.stringify(resObject.user));
        dispatch({ type: "LOGIN_SUCCESS", payload: resObject.user });
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};
