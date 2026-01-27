import { createContext, useState, useEffect } from "react";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // 🔴 CHANGED: user should NOT rely only on initial localStorage read
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [events, setEvents] = useState([]);

  // 🔴 CHANGED: auth loading flag (VERY IMPORTANT)
  const [authLoading, setAuthLoading] = useState(true);

  // 🔴 CHANGED: sync context with localStorage ON APP LOAD
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }

    setAuthLoading(false); // 🔴 CHANGED: auth resolved
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        events,
        setEvents,
        authLoading, // 🔴 CHANGED: expose loading flag
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
