import React, { useState, useEffect } from 'react'
import Table from '../table/Table'
import Form from '../form/Form'
import './styles.scss'

const API = 'https://api-tasks.vercel.app/api';

const MainPage = () => {

    const [tasks, setTasks] = useState([]); //Represents existing tasks 

    const [taskId, setTaskId] = useState(null); // We create an id's state as a way to identify if we're in Edit or Create State.

    const getTasks = async () => {
        const response = await fetch(`${API}/tasks`); // GET method
        const data = await response.json();
        setTasks(data);//function that get the information (data imported from API are detected)
    }

    useEffect(() => {
        getTasks()  //refresh the page
    }, []);

    return (
        <main className="main">
            <div className="main__form">
                <Form
                    tasks={tasks}
                    setTaskId={setTaskId}
                    taskId={taskId}
                    getTasks={getTasks}
                />
            </div>

            <div className="main__table">
                <Table
                    tasks={tasks}
                    taskId={taskId}
                    setTaskId={setTaskId}
                    getTasks={getTasks}
                />
            </div>
        </main>
    )
}

export default MainPage
