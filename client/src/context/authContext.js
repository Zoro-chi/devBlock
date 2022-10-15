import { createContext, useReducer, useContext } from "react";

import AuthReducer from "./authReducer";

// const INITIAL_STATE = {
//   // user: {
//   //   _id: "632b0b187c118122c34240ea",
//   //   username: "Zoro",
//   //   email: "zoro@gmail.com",
//   //   profilePicture: "",
//   //   coverPicture: "",
//   //   isAdmin: false,
//   //   followers: [],
//   //   following: ["6329c1b967ca3cba820d8d65", "6329bfede53d4acfdf4e5f03"],
//   // },
//   // isFetching: false,
//   // error: false,
// };

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  console.log(`AuthContext State: ${state}`);

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
