import {useEffect, useState} from 'react';
import NiceModal from '@ebay/nice-modal-react';
import './project.css';
import AddProject from "./AddProject.jsx";
import {getProjects, getTasks} from "../../request/util.request.jsx";
import AddTask from "./AddTask.jsx";
import DelProject from "./DelProject.jsx";
import Task from "./Task.jsx";

// eslint-disable-next-line react/prop-types
const Project = ({ teamId, userName}) => {
    // eslint-disable-next-line no-unused-vars
    const [projects, setProjects] = useState(null);
    const [selectedProjectName, setSelectedProjectName] = useState(null);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [tasks, setTasks] = useState(null);

    // Function to handle project selection
    const handleProjectSelect = (project) => {
        setSelectedProjectId(project.project_id);
    };

    // Function to handle adding a project
    const handleAddProject = () => {
        NiceModal.show(AddProject, { teamID: teamId });
    };

    // Function to handle adding a task
    const handleAddTask = () => {
        if (selectedProjectId) {
            NiceModal.show(AddTask, { projectId: selectedProjectId });
        }
    };

    // Function to handle deleting a project
    const handleDelProject = () => {
        if (selectedProjectId) {
            NiceModal.show(DelProject, { projectID: selectedProjectId });
        }
    };

    // Function to show a task
    const handleShowTask = (task) => {
        NiceModal.show(Task, { task: task, userName: userName });
    };

    useEffect(() => {
        if(userName){
            const storedProjectName = localStorage.getItem('selectedProjectName');
            const storedProjectId = localStorage.getItem('selectedProjectId');
            setSelectedProjectId(storedProjectId);
            setSelectedProjectName(storedProjectName);
        }
    }, [userName]);

    useEffect(() => {
        const fetchProjectsAndTasks = async () => {
            if (teamId) {
                try {
                    const userTeam = await getProjects(teamId);
                    setProjects(userTeam);

                    if (selectedProjectId) {
                        const selectedProject = userTeam.find(
                            (project) => project.project_id === selectedProjectId
                        );
                        if (selectedProject) {
                            setSelectedProjectName(selectedProject.project_name);
                        }

                        // Fetch tasks for the selected project
                        const userTasks = await getTasks(selectedProjectId);
                        setTasks(userTasks);
                    }
                } catch (error) {
                    console.error('Error fetching projects or tasks:', error);
                }
            }
        };

        fetchProjectsAndTasks();
    }, [teamId, selectedProjectId]);

    useEffect(() => {
        if (selectedProjectId !== null) {
            localStorage.setItem('selectedProjectId', selectedProjectId);
            if (selectedProjectName !== null) {
                console.log(selectedProjectName);
                console.log(selectedProjectId);
                localStorage.setItem('selectedProjectName', selectedProjectName);
            }
        }
    }, [selectedProjectId, selectedProjectName]);
    return (
        <div className="project-container">
            <div className="project-list">
                <h2>项目</h2>
                <ul>
                    {projects && projects.map((project, index) => (
                        <li className="username" onClick={() => handleProjectSelect(project)} key={index}>{project.project_name}</li>
                    ))}
                </ul>
                <button onClick={handleAddProject} disabled={!userName || (teamId === 0)}>创建新项目</button>
            </div>
            {teamId === 0 ? (
                    <div className="task-lanes" >
                        <h1 className="tip2">您还未加入团队</h1>
                    </div>
                )
            : (
                    <div className="task-lanes">
                        {selectedProjectId ? (<div className="title2"><h2 >{selectedProjectName}</h2>
                            <button onClick={handleDelProject} disabled={!selectedProjectId}>删除此项目</button>
                        </div>) : (
                            <h2>选择你的项目</h2>)}
                        <button onClick={handleAddTask} disabled={!selectedProjectId}>创建新任务</button>
                        <div className="lanes">
                            <div className="lane">
                                <h3>未开始</h3>
                                <ul>
                                    {tasks &&
                                        tasks
                                            .filter((task) => task.statues === 0)
                                            .map((task, index) => (
                                                <li className="tasks" onClick={() => handleShowTask(task)}
                                                    key={`not-started-${index}`}>
                                                    {task.task_name}
                                                </li>
                                            ))}
                                </ul>
                            </div>
                            <div className="lane">
                                <h3>进行中</h3>
                                <ul>
                                    {tasks &&
                                        tasks
                                            .filter((task) => task.statues === 1)
                                            .map((task, index) => (
                                                <li className="tasks" onClick={() => handleShowTask(task)}
                                                    key={`in-progress-${index}`}>
                                                    {task.task_name}
                                                </li>
                                            ))}
                                </ul>
                            </div>

                            <div className="lane">
                                <h3>已结束</h3>
                                <ul>
                                    {tasks &&
                                        tasks
                                            .filter((task) => task.statues === 2)
                                            .map((task, index) => (
                                                <li className="tasks" onClick={() => handleShowTask(task)}
                                                    key={`completed-${index}`}>
                                                    {task.task_name}
                                                </li>
                                            ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Project;