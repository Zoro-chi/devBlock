import { createContext, useReducer } from "react";

import AuthReducer from "./authReducer";

const INITIAL_STATE = {
  // user: {
  //   _id: "632b0b187c118122c34240ea",
  //   username: "Zoro",
  //   email: "zoro@gmail.com",
  //   profilePicture: "",
  //   coverPicture: "",
  //   isAdmin: false,
  //   followers: [],
  //   following: ["6329c1b967ca3cba820d8d65", "6329bfede53d4acfdf4e5f03"],
  // },
  // isFetching: false,
  // error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
