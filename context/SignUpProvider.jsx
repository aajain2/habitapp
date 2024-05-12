import React, { createContext, useContext, useState } from 'react'

const SignUpContext = createContext()
export const useSignUpContext = () => useContext(SignUpContext)

const SignUpProvider = ({ children }) => {
  const [name, setName] = useState("Test")
  const [birthday, setBirthday] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <SignUpContext.Provider
      value={{
        name,
        setName,
        birthday,
        setBirthday,
        phoneNumber,
        setPhoneNumber,
        username,
        setUsername,
        password,
        setPassword
      }}
    >
      {children}
    </SignUpContext.Provider>
  )
}

export default SignUpProvider