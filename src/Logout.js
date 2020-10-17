import React from "react";

import Config from './Config'

import { useHistory } from "react-router-dom";

function Logout(){
  const history = useHistory();
  
  React.useEffect(() => {history.push(Config.routesConfig.getLoginLink())});
  return (<></>);
}

export default Logout;