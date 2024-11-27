import React from "react";
import { MdWorkspaces } from "react-icons/md";
import { GlobalText, SmallText, Text } from "../atoms/TextsGlobal";
import { FaFolder } from "react-icons/fa";
import { useState } from "react";
import { CiFolderOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";


export function WorkspacesMolecule({ open, onShow }) {
  const [rotate, setRotate] = useState(false)
  return (
    <div
      className=" h-full cursor-pointer flex w-full flex-row items-center justify-center"
      onClick={() =>[onShow(),setRotate(!rotate)]}
    >
      <MdWorkspaces
        className={`${open ? "w-7 h-7 mr-5" : "w-8 h-8"}  ${rotate ? 'rotate-0' : 'rotate-[60deg]'}  text-white transition-all`}
      />
      {open && <GlobalText color="white" text="Áreas de Trabajo" />}
    </div>
  );
}

export const WorkspacesMoleculeItem = ({ open, workspaces, color }) => {
  return (
    <div className="flex w-full items-center flex-row pl-12 my-2 ">
      <FaFolder className="w-6 h-6 text-white mr-2" />
      {open && (
        <GlobalText
          color={color ? color : "white"}
          text={`${
            workspaces.workSpaceName.slice(0, 18) +
            (workspaces.workSpaceName.length > 18 ? "..." : "")
          } de ${workspaces.propetaryUser.name}`}
        />
      )}
    </div>
  );
};

export const WorkspacesMoleculeCard = ({ findPrivilege , workspaces, color, theme }) => {
  const rute = `/App/${workspaces._id}`
  return (
    <div
      onClick={() => {findPrivilege(workspaces, rute)}}
      className={`flex flex-row max-h-20 shadow-xl rounded-lg border w-11/12 mx-5 transition-all cursor-pointer items-center px-6 py-2 ${ theme? 'bg-slate-800':'bg-white' }`}
    >
      
      <CiFolderOn className="w-10 h-10  mr-2" />
      <div className="w-full flex flex-col mt-2 justify-center items-center">
      <GlobalText
        text={`${
          workspaces.workSpaceName.slice(0, 18) +
          (workspaces.workSpaceName.length > 18 ? "..." : "")
        } de ${workspaces.propetaryUser.name}`}
      />
      
      <div className="w-full border-b-2 my-1 "></div>

      <SmallText color={'-blue-500'} text={workspaces.propetaryUser.email} />
    </div>
      
    </div>
  );
};



export const ProjectsMoleculeCard = ({admin, project, color, workspaceId, handelDelete, theme }) => {
  const navigate = useNavigate();
  const data = new Date(project.createdAt);
  const fecha = data.toUTCString();
  const fecha2 = data.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div
      className={`w-full h-14 pr-2 flex justify-between items-center border-2 rounded-lg my-1 ${ theme ? 'bg-slate-800':'bg-white' }`}
    >
      { admin? <form onSubmit={async(e) =>{
        e.preventDefault();
        await handelDelete(project._id, workspaceId);
      } } className=" flex items-center justify-center w-16 py-3  px-5 ">
        <button className="border-r-2 px-2">
        <RiDeleteBin2Line
            className=" hover:border-2 hover:border-red-500 h-6 w-6 text-red-500 hover:rounded-sm"
          />
        </button>
      </form> : null}
      <div onClick={() => navigate(`/App/${workspaceId}/${project._id}`)} className={`w-[96%] ${ theme ? ' hover:bg-slate-700 ':' hover:bg-[#f5f5f5] ' } h-full px-5 cursor-pointer flex items-center justify-between`}>
        <div className=" flex items-center w-2/12">
        <CiFolderOn className="w-6 h-6 mr-2" />
        <GlobalText
          text={`${
            project.nameProject.slice(0, 18) +
            (project.nameProject.length > 18 ? "..." : "")
          }`}
        />
        </div>
        <div className="w-2/12">
        <GlobalText text={`Tareas ${project.tasks.length}`} />
        </div>
        <div className="w-2/12">
            <GlobalText text={`Creado el ${fecha2}`} />
        </div>
        <div className="w-2/12">
          
      <GlobalText text={`${project.status}`} />
        </div>
      </div>
    </div>
  );
};
