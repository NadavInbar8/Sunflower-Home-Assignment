import { createContext, useContext, useState } from "react";
import type { TemperatureUnit } from "../types";

interface UnitContextType {
  unit: TemperatureUnit;
  setUnit: (unit: TemperatureUnit) => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider = ({ children }: { children: React.ReactNode }) => {
  const [unit, setUnit] = useState<TemperatureUnit>("metric");
  return (
    <UnitContext.Provider value={{ unit, setUnit }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) throw new Error("useUnit must be used within a UnitProvider");
  return context;
};
