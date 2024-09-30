import { useEffect, useState } from "react";
import { SmallText, SubTitle, Text, Title } from "../../atoms/TextsGlobal";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Buttons } from "../../atoms/FormularyItems";
import { useUserContext } from "../../context/UserContext";
import Swal from "sweetalert2";
import { getTasksbyWorkspace } from "../../api";
import Cookies from "universal-cookie";

function WorkspaceEdit() {
  const cookie = new Cookies()
  const token = cookie.get('x-access-user')
  const id = useParams().id;
  const queryClient = useQueryClient();
  const [workspace, setWorkspace] = useState({});
  const [Participantes, setParticipantes] = useState([]);
  const [user, setUser] = useState({});
  const [colors, setColors] = useState([
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-lime-500",
    "bg-gray-500",
  ]);

  
  const { Theme } = useUserContext();

  const navigate = useNavigate();

  const { data: tareas, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const data = await getTasksbyWorkspace(token, id);
      return data;
    },
  });

  const getWorkSpace = async () => {
    const workspaces = await queryClient.getQueryData(["workspaces"]);
    const userData = await queryClient.getQueryData(["userData"]);
    setWorkspace(workspaces.find((workspace) => workspace._id === id));

    const participants = workspaces.find(
      (workspace) => workspace._id === id
    ).participantes;
    setParticipantes(participants);

    const user = userData.user;
    setUser(user);
  };

  useEffect(() => {
    getWorkSpace();
  }, []);
  return (
    <div className="h-full w-full py-8 px-10">
      <div className="py-5 border-b-2">
        <Title text="Detalles de workspace" />
      </div>
      <div className="grid grid-cols-3 gap-5 p-5">
        <div
          className={` h-96 max-h-96 shadow-md rounded p-5 flex flex-col justify-between ${
            Theme
              ? "shadow-gray-800  bg-slate-800"
              : "shadow-gray-200 bg-white "
          } `}
        >
          <div className=" py-2 border-b-2">
            <SubTitle text="Proyectos" />
          </div>
          <div className="w-full h-full overflow-auto py-5 px-2">
            {workspace.projects &&
              workspace.projects.map((project) => (
                <>
                  <div
                    className={`flex justify-between px-2 border-2 cursor-pointer rounded-lg my-1 py-1 ${Theme ? "hover:bg-slate-700" : "hover:bg-[#f5f5f5]"}`}
                    key={project._id}
                    onClick={() =>
                      navigate(`/App/${workspace._id}/${project._id}`)
                    }
                  >
                    <div className="">
                      <SmallText text="Nombre" />
                      <Text
                        color={" font-semibold"}
                        text={project.nameProject}
                      />
                    </div>
                    <div className="">
                      <SmallText text="Estado" />
                      <Text color={" font-semibold"} text={project.status} />
                    </div>
                  </div>
                </>
              ))}
          </div>
          <div className="">
            <Buttons
              text="Ver proyectos"
              onClick={() => navigate(`/App/${workspace._id}`)}
            />
          </div>
        </div>
        <div
          className={` h-96 max-h-96 shadow-md rounded p-5 flex flex-col justify-between ${
            Theme
              ? "shadow-gray-800  bg-slate-800"
              : "shadow-gray-200 bg-white "
          } `}
        >
          <div className=" py-2 border-b-2">
            <SubTitle text="Tareas" />
          </div>
          <div className="w-full h-full overflow-auto py-5 px-2">
            { isLoading === false && tareas && tareas.length > 0 &&
              tareas.map((tarea) => (
                <>
                  <div className={`flex justify-between px-2 border-2 cursor-pointer rounded-lg my-1 py-1 ${Theme ? "hover:bg-slate-700" : "hover:bg-[#f5f5f5]"}`}>
                    <div className="">
                      <SmallText text="Nombre" />
                      <Text color={" font-semibold"} text={tarea.nameTask} />
                    </div>
                    <div className="">
                      <SmallText text="Estado" />
                      <Text color={" font-semibold"} text={tarea.status} />
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
        <div
          className={` h-96 max-h-96 shadow-md rounded p-5 flex flex-col justify-between ${
            Theme
              ? "shadow-gray-800  bg-slate-800"
              : "shadow-gray-200 bg-white "
          } `}
        >
          <div className=" py-2 border-b-2">
            <SubTitle text="Participantes" />
          </div>
          <div className="w-full h-full overflow-auto py-5 px-2">
          {
            workspace && workspace.propetaryUser && 
            <div className={`flex justify-between px-2 border-2 cursor-pointer rounded-lg my-1 py-2 ${Theme ? "hover:bg-slate-700" : "hover:bg-[#f5f5f5]"}`} onClick={() => user.email == workspace.propetaryUser.email ? navigate(`/Profile`) : Swal.fire({ html:` <h1 class="text-2xl font-bold"> ${workspace.propetaryUser.name} </h1> ` })} >
            <div className="w-1/3">
              <SmallText text="Propietario" />
              <div className="w-full flex px-4">
              <div
                className={`flex justify-center items-center rounded-full text-white  w-8 h-8 ${
                  colors[Math.floor(Math.random() * colors.length)]
                }`}
              >
                <Text
                  color={" font-semibold"}
                  text={
                    user.email === workspace.propetaryUser.email
                      ? "Tu"
                      : workspace.propetaryUser.name[0]
                  }
                />
              </div>
              </div>
            </div>
            <div className="w-2/3">
              <SmallText text="Email" />
              <Text color={" font-semibold"} text={workspace.propetaryUser.email} />
            </div>
          </div>
          }
            {workspace.participates &&
              workspace.participates.length > 0 &&
              workspace.participates.map((Participante) => (
                <>
                  <div className={`flex justify-between px-2 border-2 cursor-pointer rounded-lg my-1 py-2 ${Theme ? "hover:bg-slate-700" : "hover:bg-[#f5f5f5]"}`} onClick={() => user.email === Participante.user.email ? navigate(`/Profile`) : Swal.fire({ html:` <h1 class="text-2xl font-bold"> ${Participante.user.name} </h1> ` })}>
                    <div className="w-1/3">
                      <SmallText text="Usuario" />
                      <div className="w-full flex px-4">
                      <div
                        className={`flex justify-center items-center rounded-full text-white  w-8 h-8 ${
                          colors[Math.floor(Math.random() * colors.length)]
                        }`}
                      >
                        <Text
                          color={" font-semibold"}
                          text={
                            user.email === Participante.user.email
                              ? "Tu"
                              : Participante.user.name[0]
                          }
                        />
                      </div>
                      </div>
                    </div>
                    <div className="w-2/3">
                      <SmallText text="Email" />
                      <Text
                        color={" font-semibold"}
                        text={Participante.user.email}
                      />
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}



export default WorkspaceEdit;
