import React from "react";

export default React.createContext({
  language: null,
  changeLanguage: (language) => {},
  token: null,
  userId: null,
  userEmail: null,
  login: (token, userId, email) => {},
  logout: () => {},
});
