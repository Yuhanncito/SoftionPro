import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { GlobalText, SubTitle, Title } from "../../atoms/TextsGlobal";
import {WorkspacesMoleculeCard} from "../../molecules/WorkspacesMolecule";
import { useLoaderData, useNavigate } from "react-router-dom";
import { LoadingAtoms } from "../../atoms/LoadingAtoms";

export const Loader = () => {



  return {}
}
function AppPage() {
 

  const navigate = useNavigate();
  const queryClient = useQueryClient();
 
  const {Theme,setPrivilege, setAdmin} = useUserContext();
  
  const { data: workspaces, isLoading } = useQuery({
    queryKey: ["workspaces"],
    queryFn: () => queryClient.getQueryData(["workspaces"]),
  });

  const user = queryClient.getQueryData(["userData"]);

  const findPrivilege = (workspace) => {

    if(workspace.propetaryUser._id === user.user._id){
      setPrivilege('admin')
      setAdmin(true)
    }else{
      const participate = workspace.participates.find((participante) => participante.user._id === user.user._id)
      if(participate){
        setPrivilege('participante')
        setAdmin(false)
      } 
    }
    navigate(`/App/${workspace._id}`)
  }

  return (
    <>
      {
        isLoading? <LoadingAtoms /> : (<> <div
          className={`flex w-full py-4  justify-center items-center border-b-2 mt-5`}
        >
          
          <Title text="Bienvenido de nuevo " />
        </div>
        <div className="flex flex-col w-full h-full">
          <div className="flex px-10 py-5">
            <SubTitle text="Espacio de trabajo" />
          </div>
          <div className=" h-full overflow-scroll overflow-y-auto overflow-x-hidden max-sm:h-4/6 grid grid-flow-row grid-rows-6 max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-4 ">
            {
              workspaces && workspaces.map((workspace) => {
                return (
                <>
                  <WorkspacesMoleculeCard findPrivilege={findPrivilege} theme={Theme} color="black" key={workspace._id} open={true} workspaces={workspace} />
                </>
                )
              })
            }
          </div>
        </div> </>)
      }
    </>
  );
}

export default AppPage;
