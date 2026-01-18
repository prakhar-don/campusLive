import { createContext, useState } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {

  const storedUser = localStorage.getItem("user");

  const [user, setUser] = useState(
    storedUser ? JSON.parse(storedUser) : null
  );

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [events, setEvents] = useState([]);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        events,
        setEvents
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
