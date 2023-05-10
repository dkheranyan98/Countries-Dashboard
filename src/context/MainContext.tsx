import { createContext, useState, ReactNode } from 'react';

interface PropsType {
  children: ReactNode
}

type Region = 'All Regions' | 'Africa' | 'Europe' | 'Asia' | 'Oceania' | 'Americas';
type Sort = 'Sort by Population' | 'Sort by Area';

interface ContextInterface {
  searchTerm?: string
  setSearchTerm?: (arg0: string) => void
  region?: Region
  setRegion?: (region: Region) => void
  sortValue?: Sort
  setSortValue?: (sortValue: Sort) => void
}

export const MainContext = createContext<ContextInterface>({})

export const MainContextProvider = ({ children }: PropsType) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [region, setRegion] = useState<Region>('All Regions')
  const [sortValue, setSortValue] = useState<Sort>('Sort by Population');

  return (
    <MainContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        region,
        setRegion,
        sortValue,
        setSortValue,
      }}
    >
      {children}
    </MainContext.Provider>
  )
}