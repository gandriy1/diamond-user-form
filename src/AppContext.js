import React from "react";

export const AppContext = React.createContext({ user: {username: ''}, updateUser: () => {} });

export default AppContext;
/*export function useAppContext(){
  return React.useContext(AppContext);
}*/