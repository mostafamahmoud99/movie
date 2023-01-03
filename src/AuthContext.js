import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export let UserContext = createContext(null);

export function UserContextProvider(props) {
  const [loginUser, setLoginUser] = useState(null);
  let navigate = useNavigate();
  function getUserData() {
    let token = localStorage.getItem("userData");
    let decode = jwtDecode(token);
    setLoginUser(decode);
  }

  function logOut() {
    localStorage.removeItem("userData");
    setLoginUser(null);
    navigate("/login");
  }
  useEffect(()=>{
    if(localStorage.getItem("userData")){
      getUserData()
    }
  },[])

  return (
    <UserContext.Provider value={{ getUserData, loginUser, logOut }}>
      {props.children}
    </UserContext.Provider>
  );
}
