import React from "react";

export const AppContext = React.createContext({ username: '' });

export default AppContext;
/*export function useAppContext(){
  return React.useContext(AppContext);
}*/