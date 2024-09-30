import React, { useEffect } from "react";
import {
  Title,
  SubTitle,
  LogeTitle,
  ProfileName,
  SmallText,
  Text,
  GlobalText,
} from "../atoms/TextsGlobal";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { useState } from "react";
import Logo from "../molecules/Logo";
import Profile from "../molecules/Profile";
import { Redirect } from "../atoms/FormularyItems";
import { useNavigate } from "react-router-dom";
import WorkSpacesOrganism from "./WorkSpacesOrganism";
import Cookies from "universal-cookie";
import { useQueryClient } from "@tanstack/react-query";
function SliderBar({ user, userLoading, workspaces }) {
  const [open, setOpen] = useState(true);
  const [userData , setUserData] = useState({})
  const cookies = new Cookies();
  const redirect = useNavigate();

  const useQuery = useQueryClient(); 

  const handleLogout = () => {
    cookies.remove("x-access-user", { path: '/' });
    setTimeout(() => {
      redirect("/");
    }, 100);
  };

  return (
    <div
      className={` h-full ${
        open ? "w-2/12" : " w-14"
      } bg-primary-900 items-center transition-all duration-300 flex flex-col`}
    >
      <div
        className={`  flex mt-2 px-2 h-8 items-center w-full ${
          open ? "justify-end" : "justify-center"
        }`}
      >
        <IoIosArrowForward
          onClick={() => setOpen(!open)}
          className={`${
            open ? "hidden" : "block"
          } hover:scale-110 mt-2 w-5 h-5 rounded-full text-white `}
        />
        <IoIosArrowBack
          onClick={() => setOpen(!open)}
          className={`${
            open ? "block" : "hidden"
          } hover:scale-110 mt-2 w-5 h-5 rounded-full text-white `}
        />
      </div>
      <div className=" mt-5 flex w-full  items-center justify-center flex-col">
        <Logo isOpen={open} />
      </div>
      <div
        className={`flex w-full items-center ${
          open ? "px-3 mt-5 justify-around" : "mt-2 justify-center"
        }`}
      >
        
       <Profile imagen={user.profileImagen} setMenu={() => setOpen(false)} text={userLoading? 'Cargando...': `${user.name} ${user.lastName}`} open={open} />
        
        
      </div>
      <div className={` py-6 mt-5 flex w-full flex-col bg-primary-100 h-full ${open ? "rounded-tr-[50px]":'rounded-tr-2xl'}`}>
        <WorkSpacesOrganism open={open} workspaces={workspaces} />
      </div>
      <div className=" bg-primary-100 w-full text-white px-2 py-3 flex items-center justify-center cursor-pointer"  onClick={() => handleLogout()} >
        <CiLogout className="w-8 h-8 " />
        {
          open && <GlobalText text="Cerrar Sesión" />
        }
      </div>
    </div>
  );
}

export default SliderBar;
