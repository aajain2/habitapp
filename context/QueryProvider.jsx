import React, { createContext, useContext, useState } from 'react'

const QueryContext = createContext()
export const useQueryContext = () => useContext(QueryContext)

const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState("")

  return (
    <QueryContext.Provider
      value={{
        query,
        setQuery
      }}
    >
      {children}
    </QueryContext.Provider>
  )
}

export default QueryProvider