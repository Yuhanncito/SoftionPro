import { useEffect, useState } from "react"
import { useLoaderData , useParams } from "react-router-dom"
import { useUserContext } from "../../../context/UserContext"
import { GlobalText, SubTitle, Title } from "../../../atoms/TextsGlobal"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { getProjects } from "../../../api"
import Cookies from "universal-cookie"
import { LoadingMolecule } from "../../../molecules/LoadingMolecule"
import ProgressBar from "@ramonak/react-progress-bar";

function PrincipalView() {

  const cookie = new Cookies();
  const queryClient =  useQueryClient()
  const ids = useParams()


  const {data: project, isLoading} = useQuery({
    queryKey: ['project'],
    queryFn: async () => {
      const token = cookie.get("x-access-user")
      return await getProjects(token, ids.projectId)
    }
  })

  const [progress, setProgress] = useState(0)


  return (
    <div className="flex flex-col h-full justify-around p-10">
      {
        isLoading ? <LoadingMolecule /> : <>
        
      <div className=" w-12/12 h-6/6 border-2 px-5 py-8 flex flex-col">
      <SubTitle text='Progreso del proyecto' />
      <ProgressBar completed={ isLoading? 0 : project.data? Math.round((project.data.tasks.filter((task) => task.status === "Concluido").length / project.data.tasks.length) * 100) : 0 } className="m-5" bgColor="green"  />
      </div>
        <div className="grid grid-cols-3 w-full ">
      <div className="w-12/12 h-6/6 border-2 flex items-center flex-col py-8 px-5">
          <SubTitle text='Tareas Pendientes' />
          <SubTitle text={project.data.tasks ? project.data.tasks.filter((task) => task.status === "Pendiente").length +'/'+ project.data.tasks.length : 0 } color='red-500' />
      </div>
      <div className="w-12/12 h-6/6 border-2 py-8 px-5 flex flex-col items-center">
      <SubTitle text='Tareas Iniciadas' />
      <SubTitle text={project.data.tasks ? project.data.tasks.filter((task) => task.status === "Iniciado").length  +'/'+ project.data.tasks.length  : 0} color='gray-500' />
      </div>
       <div className="w-12/12 h-6/6 border-2 py-8 px-5 flex flex-col items-center">
      <SubTitle text='Tareas Completadas' />
      <SubTitle text={project.data.tasks ? project.data.tasks.filter((task) => task.status === "Concluido").length  +'/'+ project.data.tasks.length  : 0} color='green-500' />
      </div>
      </div>
      <div className="w-12/12 h-3/6 border-2 px-5 py-8 flex  items-center flex-col"> 
         <SubTitle text='Descripción' />
         <div className="w-full h-1/4 p-5">
            <GlobalText text={`${project.data.description? project.data.description:"Aún no hay descripción. Edite el contenido del proyecto para añadir información acerca del proyecto."}`} />
         </div>
      </div>  
        </>
      }
      
    </div>
  )
}

export default PrincipalView