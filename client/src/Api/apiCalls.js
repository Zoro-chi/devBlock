import { login } from "./authRequests";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await login(userCredentials);
    localStorage.setItem("user", JSON.stringify(res.data));
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    window.location.reload();
  } catch (error) {
    dispatch({ type: "LOGIN_FAIL", payload: error });
  }
};
