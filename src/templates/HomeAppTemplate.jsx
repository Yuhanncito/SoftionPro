import React from "react";
import NavBar from "../organisms/NavBar";
import { useState } from "react";
import SliderBar from "../organisms/SliderBar";
import Breadcrumb from "../molecules/Breadcrumbs";
import WorkSpacesOrganism from "../organisms/WorkSpacesOrganism";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
function HomeAppTemplate() {
  const [theme, setTheme] = useState(false);
  const pruebaDeTarjetas = [
    {
      name: "Administración",
      owner: "Gizé",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Proyectos",
      owner: "Juan",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Tareas",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Cuestionarios",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Administración",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Proyectos",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Administración",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Proyectos",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Tareas",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Cuestionarios",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Administración",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    },
    {
      name: "Proyectos",
      owner: "Pepe",
      participants: ["Gize", "Lola"],
    }

  ]
  return (
    <div className={` transition-all duration-1000 w-screen h-screen flex flex-row ${theme ? "bg-gray-900 text-white" : "bg-white"}`}>
      <SliderBar />
      <div className=" w-full h-full flex flex-col">
        <div className={`flex flex-col shadow-lg h-32 ${theme ? " shadow-gray-800":""}`}>
          <div className={` flex w-full border-b-2 h-2/5 ${theme ? "border-gray-800" : "border-gray-200"}`}>
            <div className="flex w-4/12 ">
              <Breadcrumb />
            </div>
            <div className="flex w-8/12 justify-end">
              <div className=" mr-5">
                <p className="max-sm:hidden p-2 font-medium text-lg">Tema { theme ? "oscuro" : "claro"}</p>
              </div>
              <div className="flex items-center justify-center mr-10 w-12 cursor-pointer rounded-full " onClick={() => setTheme(!theme)}>
                {
                  !theme ? <MdOutlineLightMode className=" max-sm:w-4 max-sm:h-4 w-8 h-8 text-black" /> : <MdOutlineDarkMode className=" max-sm:h-4 max-sm:w-4 w-8 h-8 text-white" />
                }
              </div>
            </div>
          </div>
          <div className="flex h-3/5 py-2 w-full">
            <div className=" max-sm:hidden flex w-4/12">
              <NavBar />
            </div>
            <div className=" max-sm:hidden flex w-8/12 justify-end py-2">
              <div className="flex py-4 w-28 justify-center font-bold text-sm text-white bg-blue-500 rounded-lg mx-5 items-center hover:bg-blue-600 ">
                Invitar usuario
              </div>
              <div className="flex py-4 w-28 justify-center font-bold text-sm text-white bg-blue-500 rounded-lg mx-5 items-center hover:bg-blue-600 ">
                Cerrar sesion
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  h-5/6">
          <div className={`flex w-full py-4  justify-center items-center border-b-2 mt-5 ${theme ? "border-gray-800" : "border-gray-200"}`}>
            <p className=" max-sm:text-sm text-xl">Hola de nuevo usuario Gize Yuhann</p>
          </div>
          <div className="flex flex-col w-full h-full">
            <div className="flex px-10 py-5">
              <p className=" text-xl">Areas de trabajo</p>
            </div>
            <div className=" overflow-scroll overflow-y-auto overflow-x-hidden max-sm:h-4/6 grid grid-flow-row max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-4 ">
              {
                pruebaDeTarjetas.map((item, index) => {
                  return (
                   <div className={`flex shadow-lg flex-col items-center border justify-center mx-5 my-4 px-10 py-5 ${theme ? "border-gray-800 shadow-gray-800" : "border-gray-200"}`} key={`${index}`}>
                      <p className=" max-sm:text-sm  text-xl">{item.name}</p>
                      <p className=" max-sm:text-xs text-sm">{item.owner === 'Gizé'? "Dueño":" Invitado"}</p>
                   </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeAppTemplate;
