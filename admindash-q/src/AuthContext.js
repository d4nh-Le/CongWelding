import React, { createContext, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const [admin, setAdmin] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  return (
    <AuthContext.Provider value={{ admin, setAdmin, sessionId, setSessionId }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };