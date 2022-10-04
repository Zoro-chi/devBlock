import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

export const authContext = createContext(INITIAL_STATE);

export const authContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authContext, INITIAL_STATE);

  return (
    <authContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
