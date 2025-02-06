import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user data from localStorage if it exists
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      isAuthenticated: false,
      emp_id: null,
      emp_full_name: null,
      role: null,
      emp_personal_email: null,
      emp_phone_no: null,
      emp_addhar_no: null,
      emp_pan_card_no: null,
      emp_department: null,
      emp_designation: null,
      emp_join_date: null,
      emp_status: null,
      role_permission: null,
      emp_email: null,
      emp_password: null,
     
    };
  });

  useEffect(() => {
    // Save user data to localStorage whenever the user state changes
    if (user.isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);
  const logout = () => {
    localStorage.removeItem('user'); // Remove from localStorage on logout
  };
  return (
    <AuthContext.Provider value={{ user, setUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
