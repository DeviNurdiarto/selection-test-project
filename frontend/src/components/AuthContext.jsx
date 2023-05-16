import React from "react";

export const AuthContext = React.createContext({
  loggedIn: false,
  username: '',
  token: '',
  setLoggedIn: () => {},
  setUsername: () => {},
  setToken: () => {},
});
