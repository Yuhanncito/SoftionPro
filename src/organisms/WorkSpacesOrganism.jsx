import React from "react";
import {
  WorkspacesMolecule,
  WorkspacesMoleculeItem,
} from "../molecules/WorkspacesMolecule";
import { useState } from "react";
function WorkSpacesOrganism({ workspaces, open }) {
  const [openWorkspaces, setOpenWorkspaces] = useState(false);
  return (
    <div className="flex w-full flex-col">
    <div className="flex">
        <WorkspacesMolecule open={open} onShow={()=>setOpenWorkspaces(!openWorkspaces)} />
    </div>
      
      {(open && openWorkspaces) && (
        <div className="flex flex-col w-full mt-5">
          {workspaces.map((workspace, index) => {
            return (
              <WorkspacesMoleculeItem
                key={index}
                open={open}
                workspaces={workspace}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default WorkSpacesOrganism;
