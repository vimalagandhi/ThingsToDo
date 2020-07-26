import React, { createContext, useState } from "react";
export const EnumContext = createContext();

export const EnumStore = props => {
const [appMenu, setAppMenu] = useState([]);

  const p_values = {
    appMenu,
    setAppMenu
  };

  return {} ? (
    <EnumContext.Provider value={p_values}>
      {props.children}
    </EnumContext.Provider>
  ) : null;
};
