import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        sessionId: action.payload.sessionId,
        email: action.payload.email,
        userId: action.payload.userId,
      };
    case 'LOGOUT':
      return { sessionId: null, email: null, userId: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    sessionId: localStorage.getItem('sessionId') || null,
    email: localStorage.getItem('email') || null,
    userId: localStorage.getItem('userId') || null,
  });

  const handleLogin = (data) => {
    localStorage.setItem('sessionId', data.sessionId);
    localStorage.setItem('email', data.email);
    localStorage.setItem('userId', data.userId);
    dispatch({ type: 'LOGIN', payload: data });
  };

  const handleLogout = () => {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
