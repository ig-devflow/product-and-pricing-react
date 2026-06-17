import { createContext, useContext, useState, type ReactNode } from 'react'

interface DivisionContextValue {
  divisionId: number
  divisionName: string
  setDivision: (id: number, name: string) => void
}

const DivisionContext = createContext<DivisionContextValue>({
  divisionId: 0,
  divisionName: '',
  setDivision: () => {},
})

export const DivisionProvider = ({ children }: { children: ReactNode }) => {
  const [divisionId, setDivisionId] = useState(0)
  const [divisionName, setDivisionName] = useState('')

  const setDivision = (id: number, name: string) => {
    setDivisionId(id)
    setDivisionName(name)
  }

  return (
    <DivisionContext.Provider value={{ divisionId, divisionName, setDivision }}>
      {children}
    </DivisionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDivisionContext = () => useContext(DivisionContext)
