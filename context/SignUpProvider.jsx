import React, { createContext, useContext, useState } from 'react'

const SignUpContext = createContext()
export const useSignUpContext = () => useContext(SignUpContext)

const SignUpProvider = ({ children }) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [birthday, setBirthday] = useState(new Date())
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <SignUpContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        birthday,
        setBirthday,
        email,
        setEmail,
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