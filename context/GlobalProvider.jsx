import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../functions/auth";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try 10 times within 10 seconds to wait for server call
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        getCurrentUser()
        .then((res) => {
          if (res) {
            setIsLogged(true);
            setUser(res);
          } else {
            setIsLogged(false);
            setUser(null);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
      }, 1000);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;