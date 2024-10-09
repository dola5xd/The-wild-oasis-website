"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();

const initState = { from: undefined, to: undefined };
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initState);

  function resetRange() {
    setRange(initState);
  }

  return (
    <ReservationContext.Provider value={{ setRange, range, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useResrvation() {
  const context = useContext(ReservationContext);
  if (context === undefined) throw new Error("Context is'not in right place!");
  return context;
}

export { useResrvation, ReservationProvider };
