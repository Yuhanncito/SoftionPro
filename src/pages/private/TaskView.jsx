import { useEffect, useState } from "react";
import NavBar from "../../organisms/NavBar";
import { Outlet, useLoaderData, useParams, useNavigate } from "react-router-dom";
import {
  GlobalText,
  SmallText,
  SubTitle,
  Title,
} from "../../atoms/TextsGlobal";
import { CiFolderOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FormsImputs } from "../../molecules/FormsImputs";
import { deleteTask, updateTask, insertNewTask, getTasks, getProjects } from "../../api";
import Cookies from "universal-cookie";
import { RiDeleteBin2Line } from "react-icons/ri";
import { LoadingMolecule } from "../../molecules/LoadingMolecule";
import { IoMdClose } from "react-icons/io";
import { useUserContext } from "../../context/UserContext";

function TaskView() {
  const { setProject, Theme, admin } = useUserContext();
  const ids = useParams();
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState({});

  const token = cookie.get("x-access-user");

  const {
    register,
    handleSubmit: handleValidateSubmit,
    formState: { errors },
  } = useForm();

  const [task, setTask] = useState({
    nameTask: "",
    workspaceid: ids.workspaceId,
    projectRelation: ids.projectId,
    description: "",
    userTasks: [],
  });

  const handleChange = (e) => {
    if(e.target.name === 'participates'){

      task.userTasks.includes(e.target.value) ? task.userTasks.splice(task.userTasks.indexOf(e.target.value), 1) : task.userTasks.push(e.target.value)

    }else{
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  }
    console.log(e.target.value)
  };

  const [openModal, setOpenModal] = useState(false);

  const urls = [
    
    {
      link: `/App/${ids.workspaceId}/${ids.projectId}/`,
      destination: "Proyecto",
    },
    
    {
      link: `/App/${ids.workspaceId}/${ids.projectId}/List`,
      destination: "List",
    },
    {
      link: `/App/${ids.workspaceId}/${ids.projectId}/Board`,
      destination: "Tablero",
    },
    // {
    //   link: `/App/${ids.workspaceId}/${ids.projectId}/Gantt`,
    //   destination: "Gantt",
    // }
  ];

  const queryClient = useQueryClient();

  const {isLoading: isLoadingProjects ,data} = useQuery({
    queryKey: ["projects"],
    queryFn: async () => getProjects(token, ids.projectId),
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async ({ token, id }) => {
      await deleteTask(token, id, ids.workspaceId);
    },
    onSuccess: async (e) => {
      Swal.fire({
        icon: e.message == "ok" ? "success" : "error",
        title: "Tarea eliminada",
      });
      await queryClient.invalidateQueries(["tasks"]);
    },
    onError: async () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tarea no eliminada",
      });
    },
  });

  const {
    isLoading,
    data: tasks,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await getTasks(token, ids.projectId),
  });

  const insertNewTaskMutation = useMutation({
    mutationFn: async ({ token, task }) => insertNewTask(token, task),
    onSuccess: async (e) => {
      Swal.fire({
        icon: e.message == "ok" ? "success" : "error",
        title: e.message == "ok" ? "Tarea insertada" : "Tarea no insertada",
      });
      await queryClient.invalidateQueries(['tasks'])
      await queryClient.invalidateQueries(["workspaces"]);
      await queryClient.invalidateQueries(["projects"]);
      
      handleCloseModal();
    },
    onError: async () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tarea no insertada",
      });
    },
  });

  const handleDeleteTask = (token, id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta tarea?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continuar",
      confirmButtonColor: "#3085d6",
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.isConfirmed) {
        deleteTaskMutation.mutate({ token, id });
      }
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = (e) => {
    insertNewTaskMutation.mutate({ token, task });
  };


  useEffect(() => {
    const getWorkspace = async () => {
      setWorkspace(
        await queryClient
          .getQueryData(["workspaces"])
          .find((x) => x._id === ids.workspaceId)
      );
      console.log(workspace);
    }
    getWorkspace();
  }, [queryClient
    .getQueryData(["workspaces"])
    .find((x) => x._id === ids.workspaceId)]);

  return (
    <div className=" w-full h-full">
      {
        isLoadingProjects ? <LoadingMolecule /> : <><div className="flex justify-center items-center h-20 w-full">
        <div className="flex w-2/6 items-center px-10">
          <CiFolderOn className="w-10 h-10 mr-2" />
          <SubTitle text={data.data.nameProject} />
        </div>
        <div className="flex w-4/6 justify-between px-20">
          <div className="">
            <GlobalText text="Fecha de inicio: " />
            <SubTitle
              text={data.data.started ? (new Date(data.data.started).toLocaleDateString('es-ES')) : "---/---/---"}
            />
          </div>
          <div className="">
            <GlobalText text="Fecha de Cierre: " />
            <SubTitle
              text={data.data.started ? (new Date(data.data.finished).toLocaleDateString('es-ES')) : "---/---/---"}
              />
          </div>
          <div className="">
            <GlobalText text="Estado del proyecto: " />
            <SubTitle text={data.data.status ? data.data.status : "------"} />
          </div>
        </div>
      </div>

      <div className="flex justify-center border-b-2">
        <NavBar urls={urls} />
       { admin ? <div className="px-4 py-3 flex">
          <button
            onClick={() => setOpenModal(true)}
            className=" hover:bg-blue-600 mx-2 justify-center w-32 text-lg flex items-center font-medium text-white bg-blue-500 rounded-xl py-2"
          >
            Añadir Tarea
          </button>
          <button onClick={() => navigate(`/App/${ids.workspaceId}/${ids.projectId}/Edit`)} className=" hover:bg-blue-600 mx-2 justify-center w-40 text-lg flex items-center font-medium text-white bg-blue-500 rounded-xl py-2">
            Editar Proyecto
          </button>
        </div>: null}
      </div>

      <div className="w-full h-[calc(100vh-200px)]">
        
      <Outlet />
        </div></>
      }
      


      {openModal && (
        <div className="fixed transition-all inset-0 flex items-center bg-gray-500/50 justify-center z-50">
          <div className={`${!Theme?'bg-white':'bg-gray-900'}  rounded-lg  w-1/3 shadow-xl`}>
          <div className=" flex w-full justify-end p-6">
              <button
                onClick={handleCloseModal}
                className=" text-gray-500 hover:text-red-500 hover:bg-red-100 p-2 rounded-full"
              >
                <IoMdClose className="h-6 w-6  " />
              </button>
            </div>
            <div className="w-full h-full px-10 pb-6">
            
            <SubTitle text={"Crear tarea para"}/>
            <Title text={data.data.nameProject}/>

            <form
              onSubmit={handleValidateSubmit(handleSubmit)}
              className="flex flex-col mt-5"
            >
              <FormsImputs id="nameTask" text={'añadue una tarea'} label="Nombre de la tarea" type="text" onChange={handleChange} validate={register} />

              <FormsImputs
                id="timeHoursTaks"
                label="Horas dedicadas"
                type="number"
                onChange={handleChange}
                validate={register}
              />
              {errors.nameTask && (
                <p className="text-red-500">{errors.nameTask.message}</p>
              )}

              <FormsImputs
                id="descriptionTask"
                label="Descripción"
                type="text"
                onChange={handleChange}
                validate={register}
              />
              {errors.nameTask && (
                <p className="text-red-500">{errors.nameTask.message}</p>
              )}

              <div className="w-full mt-5">
              <GlobalText text="Asignar a:"/>
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">

              <div className=" flex ">
              <input name="participates" value={workspace.propetaryUser._id}  onChange={handleChange} type="checkbox" className="w-4 h-4" />
              <GlobalText text={workspace.propetaryUser.name} />
              </div>
              {
                workspace &&  workspace.participates.map((participante) => (
                  <div className="flex items-center" key={participante._id}>
                    <input name="participates" value={participante.user._id} onChange={handleChange} type="checkbox" className="w-4 h-4" />
                    <GlobalText text={participante.user.name} />
                  </div>
                ))
              }
              </div>


              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 disabled:bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  disabled={false}
                >
                  Crear
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      )}
     
    </div>
  );
}

export default TaskView;
