import { createContext, useState } from "react";
import { type ReactNode } from 'react';

export const TreeOfValuesContext = createContext({
    selectedEssence: '',
    setSelectedEssence: (selectedEssence: string) => {}
});

export const TreeOfValuesContextProvider = ({ children }: { children: ReactNode }) => {
    const [selectedEssence, setSelectedEssence] = useState('');
      const ctxValue = {
        selectedEssence: selectedEssence,
        setSelectedEssence: (selectedEssence: string) => {
          setSelectedEssence(prevSelectedEssence => prevSelectedEssence === selectedEssence ? '' : selectedEssence);
        }
      }

      return (<TreeOfValuesContext.Provider value={ctxValue}>
        {children}
      </TreeOfValuesContext.Provider>)
}