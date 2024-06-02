import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../firebase/auth";
import { Alert } from "react-native";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, () =>
      getCurrentUser()
        .then((res) => {
          setLoading(false)

          if (res) {
            setIsLogged(true)
            setUser(res)
          }
        })
        .catch((error) => {
          Alert.alert("Error", error.message)
        })
    )

    return () => unregisterAuthObserver()
  }, []);

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()

      setUser(currentUser)
    } catch (e) {
      Alert.alert(e.message)
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        refreshUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;