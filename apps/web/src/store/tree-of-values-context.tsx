import { createContext, useState } from "react";
import { type ReactNode } from 'react';

export const TreeOfValuesContext = createContext({
    selectedEssence: '',
    setSelectedEssence: (_selectedEssence: string) => {}
});

export const TreeOfValuesContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedEssence, setSelectedEssence] = useState('');
      const ctxValue = {
        selectedEssence: selectedEssence,
        setSelectedEssence: (newSelectedEssence: string) => {
          setSelectedEssence(prevSelectedEssence => prevSelectedEssence === newSelectedEssence ? '' : newSelectedEssence);
        }
      }

      return (<TreeOfValuesContext.Provider value={ctxValue}>
        {children}
      </TreeOfValuesContext.Provider>)
}