import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

// This is the initial state that is being defined
const INITIAL_STATE = {
  //The below line states that is any user is available in the local storage then take that user else
  //set it to null
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// The context obj is created with the properties of the INITIAL_STATE
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {

  //useReducer hook is called and the reducer and state is passed
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // A useEffect hook is utilized to synchronize the user state with the localStorage.
  // It runs every time the user state changes.
  //Basically it sets the user key to the user in the localStorage as soon as the user gets changed
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {/* The {children} prop is used to render the child components of AuthContextProvider within the AuthContext.
      Provider component.  */}
      {children}
    </AuthContext.Provider>
  );
};