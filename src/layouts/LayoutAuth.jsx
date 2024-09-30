import React from 'react'
import { Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import Cookies from 'universal-cookie'

function LayoutAuth() {
    const redirectPage = useNavigate();
    const [isTocken, setIsTocken] = useState(false);
    const { email } = useUserContext();
    const cookies = new Cookies();

    const token = cookies.get("x-access-user");

  return (
        token? <Navigate to="/App" /> : !email? <Navigate to="/" /> :   <Outlet />
  )
}

export default LayoutAuth

// import { Outlet } from "react-router-dom";
// import Cookies from "universal-cookie";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function LayoutPublic() {
//   const redirectPage = useNavigate();
//   const [isTocken, setIsTocken] = useState(false);
//   const cookies = new Cookies();

  

//   const token = cookies.get("x-access-user");

//   useEffect(() => {
//     if (token) {
//       redirectPage("/App");
//       setIsTocken(true);
//     }
//   }, []);
//   return (
//      <Outlet />
//   );
// }

// export default LayoutPublic;
