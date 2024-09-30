import React, { useEffect } from 'react'
import { useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask, insertNewTask } from "../../../api";
import { SubTitle, SmallText, GlobalText,Title } from "../../../atoms/TextsGlobal";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { FormsImputs } from '../../../molecules/FormsImputs';
import { useState } from 'react'; 
import { useForm } from 'react-hook-form';
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useUserContext } from '../../../context/UserContext';
import { IoMdClose } from 'react-icons/io';




function ListTask() {

  const navigate = useNavigate();
    const cookie = new Cookies();
    const token = cookie.get("x-access-user");
    const ids = useParams();
    const {Theme, admin} = useUserContext()
     
    const QueryClient = useQueryClient();


    const { register, handleSubmit: handleValidateSubmit, formState: { errors }, reset } = useForm();

    const deleteTaskMutation = useMutation({
      mutationFn: async ({ token, id }) => {
        await deleteTask(token, id, ids.workspaceId);
      },
      onSuccess: async () => {
        Swal.fire({
          icon: "success",
          title: "Tarea eliminada",
        });
        await QueryClient.invalidateQueries(["tasks"]);
        await QueryClient.invalidateQueries(["projects"]);
        await QueryClient.invalidateQueries(["workspaces"]);
      },
      onError: async () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tarea no eliminada",
        });
      },
    });

    const insertTaskMutation = useMutation({
      mutationFn: async ({ token, task }) => await insertNewTask(token, task),
      onSuccess: async (e) => {
        console.log(e);
        Swal.fire({
          icon: e.message == 'ok' ? "success" : "error",
          title: e.message == 'ok' ? "Tarea creada" : "Tarea no creada",
        });
        await QueryClient.invalidateQueries(["tasks"]);
        await QueryClient.invalidateQueries(["projects"]);
        await QueryClient.invalidateQueries(["workspaces"]);
        
      },
      onError: async () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tarea no creada",
        });
      },
    });

    const [task, setTask] = useState({
        nameTask: "",
        workspaceid: ids.workspaceId,
        projectRelation: ids.projectId,
      });

    const tasks = QueryClient.getQueryData(["tasks"]);

    const handleChange = (e) => {
        setTask({
          ...task,
          [e.target.name]: e.target.value,
        });
      };

    const handleAddTask = () => {
        insertTaskMutation.mutate({ token, task });
        setTask({
          nameTask: "", 
          workspaceid: ids.workspaceId,
          projectRelation: ids.projectId,
        });
        reset();
      };
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

      const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-orange-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-teal-500",
        "bg-gray-500"
      ]

      const queryClient = useQueryClient();

      const [data, setTasks] = useState([]);

      

      const [openModal, setOpenModal] = useState(false);
      const [workspace, setWorkspace] = useState({});
      const handleOpenModal = () => {
        setOpenModal(true);
      }

      const handleCloseModal = () => {
        setOpenModal(false);
      }

      const handleSubmitUpdate = (e) => {
        insertTaskMutation.mutate({ token, task });
        setTask({
          nameTask: "",
          workspaceid: ids.workspaceId,
          projectRelation: ids.projectId,
        });
        reset();
      };

      useEffect(() => {
        const getWorkspace = async () => {

          await QueryClient.invalidateQueries(["tasks"]);
          await QueryClient.invalidateQueries(["projects"]);
          await QueryClient.invalidateQueries(["workspaces"]);

          const workspace = await queryClient.getQueryData(["workspaces"]);
          setWorkspace(workspace.find((x) => x._id === ids.workspaceId));
          
          setTasks(
            await queryClient.getQueryData(["project"])
          );
        };
        getWorkspace();
      }, []);


      const [tempTask, setTempTask] = useState({});

      const handleModal = (task) => {
        setOpenModal(true);
        setTempTask(task);
      }

  return (
    <div className="w-full p-10 overflow-auto h-[calc(90vh-10rem)]">
          <div className="w-full py-3 border-b-2 px-5  ">
            <SubTitle text={"Tareas " + tasks.length} />
          </div>
          <div className="w-full h-46 overflow-auto   flex pt-5 flex-col">
            <div className="flex flex-col  ">
              {tasks.length > 0 &&
                tasks.map((task, index) => {
                  return (
                    <div className={`w-full h-14 flex justify-between items-center border-2 rounded-lg my-1 ${Theme? '':'bg-white'}`}>
                      {admin ? <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleDeleteTask(token, task._id);
                        }}
                        key={index}
                        className=" flex items-center justify-center w-16 py-3  px-5"
                      >
                        <button className=" border-r-2 px-2">
                          <RiDeleteBin2Line className="  hover:border-2 hover:border-red-500 h-6 w-6 text-red-500 hover:rounded-sm" />
                        </button>
                      </form> : null}
                      <div className="w-[calc(100%-4rem)] px-10 h-full flex justify-around items-center cursor-pointer hover:bg-[#f5f5f5]/60  " 
                      onClick={()=>navigate(`/App/${ids.workspaceId}/${ids.projectId}/${task._id}`)}>
                        <div className="w-1/4">
                          <SmallText text="Nombre" />
                          <GlobalText text={ task.nameTask.length > 20 ? task.nameTask.slice(0, 20) + "..." : task.nameTask  } />
                        </div>
                        <div className="w-1/4">
                          <SmallText text="Participantes" />
                          <div className="w-full flex ">
                            {
                              task.userTasks.length > 0
                                ? task.userTasks.map((user, index) => {
                                  return (
                                    <div
                              className={` w-5 h-5 flex justify-center items-center text-white font-semibold rounded-full ${ Math.floor(Math.random() * 10) % 2 == 0 ? colors[Math.floor(Math.random() * 10) % 9] : colors[Math.floor(Math.random() * 10) % 9] }`}
                            >
                              {user.name.slice(0, 1)}
                            </div>
                                  );
                                })
                                : <GlobalText text={"Sin participantes"} />
                            }
                          </div>
                        </div>
                        <div className="w-1/4">
                          <SmallText text="Horas" />
                          <GlobalText
                            text={
                              task.timeHoursTaks
                                ? task.timeHoursTaks
                                : "Horas indefinidas"
                            }
                          />
                        </div>
                        <div className="w-1/4">
                          <SmallText text="Estado" />
                          <GlobalText text={task.status} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            {tasks.length == 0 && <SubTitle text={"No hay tareas"} />}
            { admin? <form
              className={
                tasks.length > 0
                  ? "w-full py-3 border-t-2 px-5 mt-4"
                  : "w-5/6 py-3 border-b-2 px-5"
              }
              onSubmit={handleValidateSubmit(handleAddTask)}
            >
              <FormsImputs
                id="nameTask"
                text="Crea una nueva tarea"
                type="text"
                onChange={handleChange}
                validate={register}
              />
              {errors.nameTask && (
                <p className="text-red-500">{errors.nameTask.message}</p>
              )}
            </form> : null}
          </div>
        </div>
  )
}

export default ListTask