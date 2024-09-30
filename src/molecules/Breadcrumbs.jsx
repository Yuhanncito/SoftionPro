
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosHome } from 'react-icons/io';
import { useQueryClient } from '@tanstack/react-query';

function Breadcrumb({ data }) {
    const QuetyClient = useQueryClient();
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((item) => item);
    const classes = 'mx-2 hover:text-blue-500 text-sm font-semibold max-sm:text-xs flex justify-center items-center';

    const [workspace, setWorkspace] = useState('');
    const [project, setProject] = useState('');
    const [task, setTask] = useState('');

    useEffect(() => {
        if (pathnames[1]) {
            const workspaceData = data.find((w) => w._id === pathnames[1]);
            setWorkspace(workspaceData ? workspaceData: '');
        }

        if (pathnames[2] && workspace.workSpaceName) {
            const projectData = workspace.projects.find((p) => p._id === pathnames[2]);
            setProject(projectData ? projectData : '');
        }

        if (pathnames[3] && project && pathnames[3] !== 'App' && pathnames[3] !== 'Edit' && pathnames[3] !== 'List' && pathnames[3] !== 'Gantt' && pathnames[3] !== 'Board') {
            const tasks = QuetyClient.getQueryData(['tasks']);
            const taskData = tasks.find((t) => t._id === pathnames[3]);
            setTask(taskData.nameTask);
        }
    }, [data, pathnames]);

    const breadcrumbComponents = pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
            <Link key={to} to={to} className={classes}>
{(value !== 'App' && value !== 'Edit' && value !== 'List' && value !== 'Gantt' && value !== 'Board') ? value === pathnames[1] ? workspace.workSpaceName + (workspace.length > 9 ? '...' : '') : pathnames[2] === value ? project.nameProject : (pathnames[3] === value) ? task.slice(0, 9) + (task.length > 9 ? '...' : '') : value.slice(0, 9) + (value.length > 9 ? '...' : '') : value}
</Link>
        );
    });

    return (
        <div className="w-full pl-10 max-sm:pl-1 flex items-center h-12">
            <Link to="/App" className={classes}>
                <IoIosHome />
            </Link>
            /
            {breadcrumbComponents.length > 0 &&
                breadcrumbComponents.reduce((prev, curr) => (
                    <>
                        {prev}
                        <span> / </span>
                        {curr}
                    </>
                ))}
        </div>
    );
}

export default Breadcrumb;


