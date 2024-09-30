import {useState, useEffect} from 'react'
import { GlobalText, SubTitle, Text } from '../../../atoms/TextsGlobal'
import {IoIosArrowBack } from 'react-icons/io'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { updateTask } from '../../../api'
import { useUserContext } from '../../../context/UserContext'
import { Buttons, EditInput } from '../../../atoms/FormularyItems'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import Swal from 'sweetalert2'
import { EditFormsImputs } from '../../../molecules/FormsImputs'

function EditTask() {
    const idTask = useParams();

    const cookie = new Cookies();

    const token = cookie.get("x-access-user");

    const navigate = useNavigate();

    const {Theme, admin} = useUserContext()

    const QueryClient = useQueryClient();

    const [task, setTask] = useState({
      workspaceid: idTask.workspaceId,
    });
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
      if(e.target.id === 'idUser'){
        const userFound = task.userTasks.find(user => user._id === e.target.value);

if (userFound) {
  // Si encontramos al usuario, lo eliminamos del arreglo
  setTask({
    ...task,
    userTasks: task.userTasks.filter(user => user._id !== e.target.value)
  });
} else {
  // Si no encontramos al usuario, lo añadimos al arreglo
  const user = task.userTasks.find(user => user === e.target.value);
  if (!user) {
    setTask({
      ...task,
      userTasks: [...task.userTasks, e.target.value]
    });
  }
  else{
    setTask({
      ...task,
      userTasks: task.userTasks.filter(user => user !== e.target.value)
    });
  }
}

        console.log('actualizacion',task)
      }else{
        setTask({...task, [e.target.name]: e.target.value});
      }
    };


    const updateTaskMutation = useMutation({
        mutationFn: async () => {
          await updateTask(token, task);
        },
        onSuccess: async (e) => {
            console.log(e);
            Swal.fire({
              icon:  "success" ,
              title: "Tarea actualizada",
            });
            QueryClient.invalidateQueries(["tasks"]);
            QueryClient.invalidateQueries(["projects"]);
            QueryClient.invalidateQueries(["workspaces"]);
            navigate(-2);
          
        },


        onError: async () => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tarea no actualizada",
          });
        },
      });

      const handleUdpate = async () => {
        if(admin){
        Swal.fire({
            title: "¿Estás seguro de actualizar esta tarea?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Continuar",
            cancelButtonText: "Cancelar",
          }).then(async (result) => {
            if (result.isConfirmed) {
              await updateTaskMutation.mutateAsync();
            }
          });
        }else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No eres administrador",
          });
        }
      }

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
        const getUsers = async () => {
          const workspaces = await QueryClient.getQueryData(["workspaces"]);
          const workspace = workspaces.find((workspace) => workspace._id === idTask.workspaceId);
          let user = [];
          user.push(workspace.propetaryUser);
          const participates = workspace.participates.filter((participate) => user.push(participate.user));
          setUsers(user);
          console.log(user);
          
        };
        getUsers();
      }, []);

      useEffect(() => {
        const getTask = async () => {
          const res = await QueryClient.getQueryData(["tasks"]);
          const datas = await res.find((task) => task._id === idTask.idTask);
          setTask({ ...task, ...datas});
          console.log(datas);
          
        };
        getTask();
      }, []);
  return (
    task && task.status &&   <div className=' flex w-full h-full p-10 justify-center items-center ' >
        <div className=" w-10/12 p-2 h-full flex flex-col justify-evenly ">
            <div className={`w-full h-1/6 flex items-center shadow-xl rounded-t-xl ${Theme ? ' bg-slate-800 shadow-slate-700  ' : ' bg-white'}`}>
                <div className=" px-5 mr-5 cursor-pointer  ">
                <IoIosArrowBack onClick={() => navigate(-1)} className="text-3xl"/>
                </div>
                <SubTitle text={`Edición de ${task.nameTask}`}/> 
            </div>

             

            <div className="w-full h-4/6 flex justify-between items-center rounded-b-xl ">
                <div className={ ` w-7/12 h-full ${Theme ? ' bg-slate-800 shadow-slate-700  ' : ' bg-white'} shadow-xl  p-8 flex items-center flex-col ` }>
                    <GlobalText color={" font-bold"} text="Información General de la Tarea"/>
                    <div className="w-full flex flex-col">
                        <div className=" w-full py-5 ">
                          <EditFormsImputs label={"Nombre de la Tarea"} id={"nameTask"} value={task.nameTask} type={"text"} onChange={handleChange} />
                        </div>
                        <div className=" w-full ">
                        <EditFormsImputs label={"Descripción de la Tarea"} id={"descriptionTask"} value={task.descriptionTask} type={"text"} onChange={handleChange} />
                        </div>
                       <div className=" w-full py-4 ">
                        <Text text="Participantes" color={" font-bold"}/>
                        <div className="w-full flex">
                        {
    users.length > 0 ? (
        users.map((user, index) => {
            return (
                <>
                <input type="checkbox" checked={ task.userTasks.find((userTask) => userTask._id === user._id) } id='idUser' name='userTasks' value={user._id} onChange={handleChange} />
                <div
                    key={index}
                    className={`mx-2 p-4 w-5 h-5 flex justify-center items-center text-white font-semibold rounded-full ${
                        task.userTasks.find((userTask) => userTask._id === user._id) ? colors[index % 9] : colors[index % 9]
                       
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
                </>
            );
        })
    ) : (
        <GlobalText text={'Sin participantes'} />
    )
  }

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
                        <EditFormsImputs label={"Horas dedicadas"} id={"timeHoursTaks"} value={task.timeHoursTaks} type={"number"} onChange={handleChange} />
                        </div>
                        <div className=" w-full py-5 border-b-2 ">
                        <Text text="Estado"/>
                        <GlobalText  text={  task.status } />
                        </div>
                        <div className=" w-full flex flex-col ">
                            
                        { admin ? <button onClick={handleUdpate} className=" disabled:bg-blue-100 my-1 disabled:cursor-not-allowed  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-blue-600 text-white text-lg font-bold w-[100%]">
                            <GlobalText text={"Guardar"} />
                        </button>: null}
                        
                        <button onClick={() => navigate(-1)} className=" disabled:bg-blue-100 my-1 disabled:cursor-not-allowed  active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out py-3 rounded-xl bg-gray-500 text-white text-lg font-bold w-[100%]">
                            <GlobalText text={"Cancelar"} />
                        </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditTask