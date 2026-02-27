import { createContext, useContext, useState, ReactNode } from "react";

interface CityContextType {
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  cities: string[];
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const cities = ["Trichy", "Thanjavur"];

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<string>("Trichy");

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, cities }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = (): CityContextType => {
  const context = useContext(CityContext);
  if (!context) throw new Error("useCity must be used within CityProvider");
  return context;
};
