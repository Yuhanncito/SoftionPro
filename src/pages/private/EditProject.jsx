import React from "react";
import { GlobalText, SubTitle, Title } from "../../atoms/TextsGlobal";
import { FormsImputs } from "../../molecules/FormsImputs";
import { useForm } from "react-hook-form";
import { CgProfile } from "react-icons/cg";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { updateProject, deleteProject } from "../../api";
import Cookies from "universal-cookie";
import { useUserContext } from "../../context/UserContext";

function EditProject() {
  const { Theme } = useUserContext();
  const cookie = new Cookies();
  const token = cookie.get("x-access-user");
  const queryClient = useQueryClient();
  const id = useParams();
  const navigate = useNavigate();
  const [proyecto, setProyecto] = useState({});
  const [userCreated, setUserCreated] = useState({});
  const [workspace, setWorkspace] = useState("");
  const [Propietario, setPropietario] = useState("");
  const [project, setProject] = useState({
    nameProject: proyecto.nameProject,
    description: "",
    started: "",
    finished: "",
  });

  const {
    register,
    handleSubmit: handleValidateSubmit,
    formState: { errors },
  } = useForm();

  const deleteProjectMutation = useMutation({
    mutationFn: async ({ token, id, workspace }) => await deleteProject(token, id, workspace),
    onSuccess: async () => {
      Swal.fire({
        icon: "success",
        title: "Proyecto eliminado",
      });
      await queryClient.invalidateQueries(["project"]);
      await queryClient.invalidateQueries(["workspaces"]);
      navigate(`/App/${id.workspaceId}`);
    },
    onError: async () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Proyecto no eliminado",
      });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: async ({ token, project }) =>
      await updateProject(token, id.projectId, project),
    onSuccess: async (e) => {
      console.log(e);
      Swal.fire({
        icon: e.message == "ok" ? "success" : "error",
        title:
          e.message == "ok"
            ? "Proyecto actualizado"
            : "Proyecto no actualizado",
      });
      await queryClient.invalidateQueries(["project"]);
      await queryClient.invalidateQueries(["workspaces"]);
    },
    onError: async () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Proyecto no actualizado",
      });
    },
  });

  const handleSubmit = async (e) => {
    updateProjectMutation.mutate({ token, project });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteProjectMutation.mutate({ token, id: id.projectId, workspace: id.workspaceId });
  };
  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const getProject = async () => {
    const workspace = await queryClient.getQueryData(["workspaces"]);
    const workspaceD = workspace.filter((w) => w._id === id.workspaceId);
    const p = workspaceD[0].projects.filter((p) => p._id === id.projectId);

    setUserCreated(p[0].createBy.name);
    setProject({
      ...project,
      nameProject: p[0].nameProject,
      description: p[0].description,
      started: p[0].started,
      finished: p[0].finished,
    });
    setWorkspace(
      `${workspaceD[0].workSpaceName} de ${workspaceD[0].propetaryUser.name}`
    );
    setPropietario(`${workspaceD[0].propetaryUser.name}`);
    setProyecto(queryClient.getQueryData(["project"]).data);
  };

  useEffect(() => {
    getProject();
  }, [
    queryClient.getQueryData(["project"]),
    queryClient.getQueryData(["workspaces"]),
  ]);

  return (
    proyecto && (
      <div className="w-full h-full p-10 flex flex-row justify-around">
        <form
          onSubmit={handleValidateSubmit(handleSubmit)}
          className={` h-3/4 transition-all w-7/12 px-10 py-5 border-2 ${
            Theme ? "" : "bg-white"
          } `}
        >
          <SubTitle text="Detalles del proyecto" />
          <div className="w-full flex items-center pt-3">
            <CgProfile className=" w-6 h-6 mr-2" />
            <GlobalText text={`Creado por ${userCreated}`} />
          </div>
          <div className="w-full h-full py-5">
            <FormsImputs
              value={project.nameProject}
              label={"Nombre del proyecto"}
              id="nameProject"
              text="Editar nombre del proyecto"
              onChange={handleChange}
              validate={register}
              errors={errors}
            />
            {errors.nameProject && (
              <p className="text-red-500 text-sm">
                {errors.nameProject.message}
              </p>
            )}
            <FormsImputs
              value={project.description}
              label={"Descripción del proyecto"}
              id="description"
              text="Editar descripción del proyecto"
              onChange={handleChange}
              validate={register}
              errors={errors}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
            <div className="w-full flex justify-between">
              <div className="w-5/12">
                <FormsImputs
                  value={project.started}
                  label={"Fecha de inicio del proyecto"}
                  type="date"
                  id={"started"}
                  text="Editar fecha de inicio del proyecto"
                  onChange={handleChange}
                  validate={register}
                  errors={errors}
                />
                {errors.started && (
                  <p className="text-red-500 text-sm">
                    {errors.started.message}
                  </p>
                )}
              </div>
              <div className="w-5/12">
                <FormsImputs
                  value={project.finished}
                  label={"Fecha de cierre del proyecto"}
                  type="date"
                  id={"finished"}
                  text="Editar fecha de cierre del proyecto"
                  onChange={handleChange}
                  validate={register}
                  errors={errors}
                />

                {errors.finished && (
                  <p className="text-red-500 text-sm">
                    {errors.finished.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex w-full justify-end py-5">
              <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                type="submit"
              >
                Editar proyecto
              </button>
              <div
                className=" bg-red-500 hover:bg-red-700 text-white cursor-pointer font-bold py-2 px-4 rounded-full"
                onClick={
                  handleDelete
                }
              >
                Eliminar proyecto
              </div>
            </div>
          </div>
        </form>
        
        <div className="w-4/12 justify-between flex flex-col">
          <div className={`w-full px-10 py-5 h-3/6 border-2 flex flex-col justify-between shadow-lg ${Theme ? "" : "bg-white"}`}>
            <SubTitle text="Tareas" />
            <div className="w-full flex flex-col items-center h-4/5 overflow-auto overflow-x-hidden  ">
              {proyecto.tasks &&
                proyecto.tasks.length > 0 &&
                proyecto.tasks.map((tarea) => (
                  <div
                    key={tarea.id}
                    className="w-full p-2 border-2 border-1 m-1"
                  >
                    <GlobalText text={tarea.nameTask} />
                  </div>
                ))}
            </div>
          </div>
          <div className={`w-full px-10 py-5 h-2/6 border-2 flex flex-col justify-between shadow-lg ${Theme ? "" : "bg-white"} `}>
            <div className="w-full h-2/5 overflow-auto">
              <SubTitle text="Workspace" />
              <GlobalText text={workspace} />
            </div>
            <div className="w-full h-2/5 overflow-auto">
              <SubTitle text="Propietario" />
              <GlobalText text={Propietario} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default EditProject;
