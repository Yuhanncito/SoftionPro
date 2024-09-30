import {useState, useEffect} from 'react'
import { GlobalText, SubTitle, Text } from '../../../atoms/TextsGlobal'
import {IoIosArrowBack } from 'react-icons/io'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { deleteTask } from '../../../api'
import { useUserContext } from '../../../context/UserContext'
import { Buttons } from '../../../atoms/FormularyItems'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'

function TasksInfo() {
    const idTask = useParams();

    const cookie = new Cookies();

    const token = cookie.get("x-access-user");

    const navigate = useNavigate();

    const {Theme, admin} = useUserContext()

    const QueryClient = useQueryClient();

    const [task, setTask] = useState({});

    const deleteTaskMutation = useMutation({
        mutationFn: async () => {
          await deleteTask(token, idTask.idTask, idTask.workspaceId);
        },
        onSuccess: async (e) => {
            console.log(e);
            Swal.fire({
              icon:  "success" ,
              title: "Tarea eliminada",
            });
            QueryClient.invalidateQueries(["tasks"]);
            QueryClient.invalidateQueries(["projects"]);
            QueryClient.invalidateQueries(["workspaces"]);
            navigate(-1);
          
        },
        onError: async () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tarea no eliminada",
          });
        },
      });

      const handleDelete = async () => {
        if(admin){
        Swal.fire({
            title: "¿Estás seguro de eliminar esta tarea?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            confirmButtonColor: "#3085d6",
          }).then(async (result) => {   
            if (result.isConfirmed) {
                deleteTaskMutation.mutate();
            }
          });
        }
        else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tarea no eliminada",
          });
        }
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

      useEffect(() => {
        const getTask = async () => {
          const res = await QueryClient.getQueryData(["tasks"]);
          const datas = await res.find((task) => task._id === idTask.idTask);
          setTask(datas);
          console.log(datas);
          
        };
        getTask();
      }, []);
  return (
    task && task.nameTask &&   <div className=' flex w-full h-full p-10 justify-center items-center ' >
        <div className=" w-10/12 p-2 h-full flex flex-col justify-evenly ">
            <div className={`w-full h-1/6 flex items-center shadow-xl rounded-t-xl ${Theme ? ' bg-slate-800 shadow-slate-700  ' : ' bg-white'}`}>
                <div className=" px-5 mr-5 cursor-pointer  ">
                <IoIosArrowBack onClick={() => navigate(-1)} className="text-3xl"/>
                </div>
                <SubTitle text={`Información de ${task.nameTask}`}/> 
            </div>

             

            <div className="w-full h-4/6 flex justify-between items-center rounded-b-xl ">
                <div className={ ` w-7/12 h-full ${Theme ? ' bg-slate-800 shadow-slate-700  ' : ' bg-white'} shadow-xl  p-8 flex items-center flex-col ` }>
                    <GlobalText color={" font-bold"} text="Información General de la Tarea"/>
                    <div className="w-full flex flex-col">
                        <div className=" w-full py-5 ">
                        <Text text="Nombre de la tarea"/>
                        <GlobalText  text={task.nameTask} />
                        </div>
                        <div className=" w-full ">
                        <Text text="Descripción de la tarea"/>
                        <GlobalText  text={task.descriptionTask} />
                        </div>
                        <div className=" w-full py-5 ">
                        <Text text="Participantes"/>
                        <div className="w-full flex mt-2    ">
                        {
    task.userTasks.length > 0 ? (
        task.userTasks.map((user, index) => {
            return (
                <div
                    key={index}
                    className={`mx-1 p-4 w-5 h-5 flex justify-center items-center text-white font-semibold rounded-full ${
                        Math.floor(Math.random() * 10) % 2 == 0
                            ? colors[Math.floor(Math.random() * 10) % 9]
                            : colors[Math.floor(Math.random() * 10) % 9]
                    }`}
                    style={{ position: 'relative' }}
                    onMouseEnter={(e) => {
                        let tooltip = document.createElement('div');
                        tooltip.className = `text-black p-2 rounded-lg absolute shadow-lg ${Theme ? ' bg-slate-600 text-white shadow-slate-700' : ' bg-white'}`;
                        tooltip.innerHTML = user.name;
                        tooltip.style.transform = 'translate(-50%, -100%)'; // Ajusta la posición vertical
                        let tooltipRect = e.target.getBoundingClientRect();
                        tooltip.style.top = `${tooltipRect.top + 80}px`;
                        tooltip.style.left = `${tooltipRect.left + (tooltipRect.right - tooltipRect.left) / 2}px`;
                        tooltip.style.right = 'unset';
                        tooltip.style.bottom = 'unset';
                         // Mueve el tooltip hacia arriba
                        e.target.parentNode.appendChild(tooltip);
                    }}
                    onMouseLeave={(e) => {
                        let tooltip = e.target.parentNode.querySelector('.absolute');
                        if (tooltip) {
                            tooltip.remove();
                        }
                    }}
                >
                    {user.name.slice(0, 1)}
                </div>
            );
        })
    ) : (
        <GlobalText text={'Sin participantes'} />
    )
}

                        </div>
                        <div className="w-full p-2 border">
                          
  <GlobalText text={' Archivos Adjuntos '} />
  <div className="">
    archivo 1
  </div>
                        </div>
                        </div>
                        
                       
                    </div>
                </div>
                <div className={`w-4/12 h-full p-8 flex items-center flex-col ${Theme ? ' bg-slate-800 shadow-slate-700  ' : ' bg-white'} shadow-xl`}>
                    <GlobalText text="Información relativa al tiempo"/>
                    <div className="w-full">
                    <div className=" w-full py-5 ">
                        <Text text="Creado"/>
                        <GlobalText  text={  new Date(task.createdAt).toLocaleDateString()  } />
                        </div>
                        <div className=" w-full ">
                        <Text text="Horas Aproximadas"/>
                        <GlobalText  text={  task.timeHoursTaks } />
                        </div>
                        <div className=" w-full py-5 border-b-2 ">
                        <Text text="Estado"/>
                        <GlobalText  text={  task.status } />
                        </div>
                        <div className=" w-full flex flex-col ">
                            
                        { admin ? <button onClick={()=> navigate(`/App/${idTask.workspaceId}/${idTask.projectId}/${idTask.idTask}/Edit`)} className=" disabled:bg-blue-100 my-1 disabled:cursor-not-allowed  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-600 text-white text-lg font-bold w-[100%]">
                            <GlobalText text={"Editar"} />
                        </button>: null}
                        {admin ? <button onClick={handleDelete} className=" disabled:bg-blue-100 my-1 disabled:cursor-not-allowed  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-red-500 text-white text-lg font-bold w-[100%]">
                            <GlobalText text={"Eliminar"} />
                        </button> :null }
                        <button onClick={() => navigate(-1)} className=" disabled:bg-blue-100 my-1 disabled:cursor-not-allowed  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-gray-500 text-white text-lg font-bold w-[100%]">
                            <GlobalText text={"Regresar"} />
                        </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default TasksInfo