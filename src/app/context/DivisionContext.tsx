import { createContext, useContext, useState, type ReactNode } from 'react';

interface DivisionContextValue {
  divisionId: number;
  divisionName: string;
  setDivision: (id: number, name: string) => void;
}

const DivisionContext = createContext<DivisionContextValue>({
  divisionId: 1,
  divisionName: 'EC Adult · ADL',
  setDivision: () => {},
});

export const DivisionProvider = ({ children }: { children: ReactNode }) => {
  const [divisionId, setDivisionId] = useState(1);
  const [divisionName, setDivisionName] = useState('EC Adult · ADL');

  const setDivision = (id: number, name: string) => {
    setDivisionId(id);
    setDivisionName(name);
  };

  return (
    <DivisionContext.Provider value={{ divisionId, divisionName, setDivision }}>
      {children}
    </DivisionContext.Provider>
  );
};

export const useDivisionContext = () => useContext(DivisionContext);
