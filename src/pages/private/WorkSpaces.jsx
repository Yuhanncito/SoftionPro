import React, { useEffect, useState } from "react";
import { createNewProject, deleteProject} from "../../api";
import { useLoaderData, useNavigate } from "react-router-dom";
import { SmallText, SubTitle, Text, Title } from "../../atoms/TextsGlobal";
import { Buttons } from "../../atoms/FormularyItems";
import { ProjectsMoleculeCard, WorkspacesMoleculeCard } from "../../molecules/WorkspacesMolecule";
import { FormsImputs } from "../../molecules/FormsImputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../../context/UserContext";
import { FaArrowRight } from "react-icons/fa6";

import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import ModalProject from "../../organisms/ModalProject";
import ModalSendInvitation from "../../organisms/ModalSendInvitation";


function WorkSpaces({params}) {

  const navigate = useNavigate();
  const cookie = new Cookies();
  const queryClient = useQueryClient();
  const [openModalProject, setOpenModalProject] = useState(false)
  const [openModalSendInvitation, setOpenModalSendInvitation] = useState(false)

  const token = cookie.get('x-access-user');

  const {Theme, admin} = useUserContext()

  const id = useLoaderData();

  const { register, handleSubmit: handleValidateSubmit, formState: { errors } } = useForm();

  const [WorkSpace , setWorkSpace ] = useState([]);

  const [project, setProject] = useState({
    nameProject: "",
    workspaceid:id
  })

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value
    })
  }


  
  const deleteProjectMutation  = useMutation({
    mutationFn: async ({token, idProject, idWorkspace}) => await deleteProject(token, idProject, idWorkspace),
    onSuccess: async () => {
      await queryClient.invalidateQueries(["workspaces"]);
      Swal.fire({
        icon: "success",
        title: "Proyecto eliminado",
        background: Theme ? "#1f2937" : "#fff",
        color: Theme ? "#fff" : "#545454",
      })
    },
    onError: async () => {
      Swal.fire({
        icon: "error",
        title: "Proyecto no eliminado",
        background: Theme ? "#1f2937" : "#fff",
        color: Theme ? "#fff" : "#545454",
      })
    },
  });

  const insertNewProjectMutation = useMutation({
    mutationFn: async ({token, project}) => createNewProject(token, project),
    onSuccess: async (e) => {
      Swal.fire({
        icon: e.message == 'ok' ? "success" : "error",
        title:e.message == 'ok' ? "Proyecto creado" : e.message,
        background: Theme ? "#1f2937" : "#fff",
        color: Theme ? "#fff" : "#545454",
      })
      await queryClient.invalidateQueries(["workspaces"]);
    },
    onError: async (e) => {
      Swal.fire({
        icon: "error",
        title: "Proyecto no creado",
        background: Theme ? "#1f2937" : "#fff",
        color: Theme ? "#fff" : "#545454",
      })
      
    },
  });

 

  const handelDelete = async (idProject, idWorkspace) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar este proyecto?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#3085d6",
      background: Theme ? "#1f2937" : "#fff",
      color: Theme ? "#fff" : "#545454",
    }).then( async (result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        
         deleteProjectMutation.mutate({token, idProject, idWorkspace})
      }
    });
  };

  const handleSubmit = async (e) => {
   insertNewProjectMutation.mutate({token, project})
  }


  useEffect(() => {
    const getWorkSpace =  async () => {
      const worskpaceData = await queryClient.getQueryData(["workspaces"]).find((x) => x._id === id)
      setWorkSpace( worskpaceData );
    }
    getWorkSpace();

  }, [id, queryClient.getQueryData(["workspaces"]).find((x) => x._id === id)]);

  return (

    WorkSpace && WorkSpace._id &&

    <div className="w-full h-full">
      
      <div className="w-full pt-10 justify-center items-center flex">
        <Title
          text={WorkSpace.workSpaceName + " de " + WorkSpace.propetaryUser.name}
        />
      </div>
      <div className="w-full h-[calc(100%)]">
        <div className="w-full h-full">
          <div className="h-[10%] flex justify-between px-5 items-center border-b-2 ">
            <SubTitle text={"Proyectos " + WorkSpace.projects.length } />
            <SubTitle color={"green-500"} text={'Proyectos concluidos ' + (WorkSpace.projects.filter(x => x.status == 'Concluido').length)} />
            <div className=" "   >
              <SubTitle text={WorkSpace.participates.length + " Participantes" } />
              <div className=" hidden w-full justify-between">
              <SmallText text="Ver participantes" color="green-500" />
              <FaArrowRight />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center m-2 w-40">
                { admin ? <Buttons text="Invitar Usuario" onClick={() => setOpenModalSendInvitation(true)} /> : null}
              </div>
              <div className="flex items-center w-40">
                
                  <Buttons text="Ver mas detalles" onClick={() => navigate('Edit')} /> 
                
              </div>
            </div>
          </div>
          <div className="w-full h-[90%] py-5 px-10 flex flex-col overflow-auto">
            <div className="w-full flex justify-end ">
            </div>
            {WorkSpace.projects.map((project, index) => {
              return <ProjectsMoleculeCard admin={admin} theme={Theme} handelDelete={handelDelete} workspaceId={WorkSpace._id} key={index} project={project} color="green" />
            })}

            { admin ? <div className="w-full p-2 border-t-2 mt-2 flex">
              {
                WorkSpace.projects.length === 0 ? <div className="w-2/12 flex justify-center items-center"><Text text="No hay proyectos" /></div> : null
              }  
              <form className={WorkSpace.projects.length === 0 ?"w-10/12 " : "w-full"} onSubmit={handleValidateSubmit(handleSubmit)}>
                <FormsImputs id="nameProject" text="Crea un nuevo proyecto. Al finalizar, precionar Enter" type="text" onChange={handleChange} validate={register} />
                {errors.nameProject && <p className="text-red-500">{errors.nameProject.message}</p>}
              </form>
            </div>:null}
          </div>
        </div>
      </div>

     
        
        {
        openModalSendInvitation && (
          <ModalSendInvitation
            openModalSendInvitation={openModalSendInvitation}
            setOpenModalSendInvitation={setOpenModalSendInvitation}
            name={WorkSpace.workSpaceName + " de " + WorkSpace.propetaryUser.name}
            user={token}
          />
        )
      }
      
    </div>
  );
}

export default WorkSpaces;
