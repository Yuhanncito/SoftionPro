// src/App.js

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { updateTask } from '../../../api';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import { useParams } from 'react-router-dom';
import { GlobalText, SmallText, SubTitle } from '../../../atoms/TextsGlobal';
import { useUserContext } from '../../../context/UserContext';

const BoardTask = () => {

  const cookie = new Cookies();
  const queryClient = useQueryClient();
  const { Theme , admin } = useUserContext();

  const ids = useParams();

  const tasks = queryClient.getQueryData(['tasks']);

  const [initialData, setInitialData] = useState({
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Pendiente',
        taskIds:  tasks.filter(task => task.status === 'Pendiente') ,
      },
      'column-2': {
        id: 'column-2',
        title: 'Iniciado',
        taskIds: tasks.filter(task => task.status === 'Iniciado') ,
      },
      'column-3': {
        id: 'column-3',
        title: 'Concluido',
        taskIds: tasks.filter(task => task.status === 'Concluido') ,
      },
    },
    tasks: tasks,
  });


  const updateStatusMutation = useMutation({
    mutationFn: async ({ token, task }) => {
      await updateTask(token, task);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(['tasks']);
      await queryClient.invalidateQueries(['workspaces']);
    },
    onError: async (err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tarea no actualizada",
      });
    },
  });

  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    if(admin){
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Actualiza el estado de la tarea
    const updatedTask = { ...data.tasks.find((task) => task._id === draggableId), status: getStatus(destination, draggableId) };
    // Crea una copia profunda de los datos de la tarea, reemplazando el estado de la tarea actualizada
    // y agregando la tarea actualizada a la copia de datos de tareas
    const updatedTasks = {
      ...data.tasks.map(task => task._id === draggableId ? updatedTask : task),
    };

    updateStatusMutation.mutate({ token: cookie.get('x-access-user'), task: {...updatedTask, workspaceid: ids.workspaceId} });


    // Actualiza las columnas
    const sourceColumn = data.columns[source.droppableId];
    const destinationColumn = data.columns[destination.droppableId];

    const updatedColumns = {
      ...data.columns,
      [source.droppableId]: {
        ...sourceColumn,
        taskIds: sourceColumn.taskIds.filter((task) => task._id !== draggableId),
      },
      [destination.droppableId]: {
        ...destinationColumn,
        taskIds: [...destinationColumn.taskIds, updatedTask],
      },
    };


    setData({ ...data, columns: updatedColumns });
    setInitialData({ ...data, columns: updatedColumns });}
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No tiene permisos para realizar esta accion",
      });
    }
  };

  const getStatus = (destination, draggableId) => {
    if (destination.droppableId === 'column-1') {
      return 'Pendiente';
    } else if (destination.droppableId === 'column-2') {
      return 'Iniciado';
    } else if (destination.droppableId === 'column-3') {
      return 'Concluido';
    }
    return data.tasks[draggableId].status;
  };
  return (
    <div className="flex h-full px-5 py-8" >
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(data.columns).map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className=" border-2 h-full flex flex-col p-4 rounded-md w-1/3"
              >
                <div className="w-full flex justify-center h-16 items-center border-b-2 mb-2"> <SubTitle text={column.title} /></div>
                
                <div className="flex flex-col gap-2 overflow-y-auto h-full overflow-hidden" style={{scrollbarWidth:'none'}}>
                  {column.taskIds.map((taskId, index) => (
                    <Draggable key={taskId._id} draggableId={taskId._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${ Theme? 'bg-gray-800' : 'bg-white' } border-2 h-16 p-3 rounded-md shadow-md mb-2 flex`}

                          onClick={() => {
                            console.log(taskId);
                          }}
                        > 
                          <div className="">
                          <SmallText text='Nombre' />
                          <GlobalText text={taskId.nameTask} />
                          </div>
                          
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default BoardTask;

