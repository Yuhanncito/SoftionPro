import React, { useEffect, useState } from 'react';
import Gantt from 'frappe-gantt';
import { useQuery } from '@tanstack/react-query';
import { useUserContext } from '../../../context/UserContext';

const GanttTask = () => {
    const { data: tasksQ, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: fetchTasks, // Refresca cada 5 segundos
    });
    const [tasks, setTasks] = useState([]);

    const { Theme } = useUserContext();

    useEffect(() => {
        if (tasksQ) {
            const ganttTasks = tasksQ.map(task => {
                return {
                    id: task.id,
                    name: (task.nameTask.length > 10) ? task.nameTask.substring(0, 10) + '...' : task.nameTask,
                    start: task.start,
                    end: task.end,
                    progress: task.progress,
                };
            });
            setTasks(ganttTasks);
        }
    }, [tasksQ]);

    useEffect(() => {
        if (tasks.length > 0) {
            
            var gantt = new Gantt("#gantt", tasks, {
                
                on_click: function (task) {
                    console.log(task);
                },
                on_date_change: function (task, start, end) {
                    console.log(task, start, end);
                    const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, start, end } : t);
                    setTasks(updatedTasks);
                },
                on_progress_change: function (task, progress) {
                    console.log(task, progress);
                    const updatedTasks = tasks.map(t => t.id === task.id ? { ...t, progress } : t);
                    setTasks(updatedTasks);
                },
                on_view_change: function (mode) {
                    console.log(mode);
                },
                language: 'es',
                readonly: true
            });
            gantt.change_view_mode('Day');
       
        }
    }, [tasks]);
 
    return (<>
        <div className={`max-w-[195vh] p-10 max-h-[90vh] transition-all overflow-auto ${Theme ? 'bg-gray-800 dark' : ''}`}>
        
            {tasks.length > 0 ? <svg id="gantt"></svg> : null}
        </div>
        <div className="w-[187vh] bottom-0 h-[75vh]  absolute" id='readonly' ></div>
        
        </>
    );
};

const fetchTasks = async () => {
    const response = await fetch('/api/tasks');
    return response.json();
};

export default GanttTask;
