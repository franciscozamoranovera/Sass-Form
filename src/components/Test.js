import React, {useState, useEffect} from 'react';
const API = 'https://api-tasks.vercel.app/api';

const Test = () => {

    const [tasks, setTasks] = useState ([]); //empty waiting for information
    const [form, setForm] = useState({
        responsable:"pancho cambio",
        description:"pancho"
    })

    const getTasks = async () => {
        const response = await fetch(`${API}/tasks`); // GET method
        const data = await response.json();
        setTasks(data);//function that get the information (data imported from API are detected)
    }

    const deleteTask = async (id) => { //We delete the task through the ID.
        const config = {
            method:'DELETE',
          }
        const response = await fetch(`${API}/task/${id}`,config); //We delete the task through the ID.
        const data = await response.json();
        if (data.success) {
            alert(data.success)
            getTasks() //refresh the page
        }
        if(data.error) alert(data.error)
    }


    const editTask = async (id) => {
        const config = {
            method:'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                responsable:form.responsable,
                description:form.description
            })
    }
        const response = await fetch(`${API}/task/${id}`,config); 
        const data = await response.json();
        if (data.success) {
            alert(data.success)
            getTasks()
        }
        if(data.error) alert(data.error)
    
    }


    const createTask = async () => {
        const config = {
            method:'POST',
            headers: {
                "Content-Type": "application/json", //Indica qué tipo de info le estamos enviando, en este caso un application/json
            }, 
            body: JSON.stringify({
                responsable:form.responsable,
                description:form.description
            })
        }
        const response = await fetch(`${API}/task`,config); // POST
        const data = await response.json();
        if (data.success) {
            alert(data.success)
            getTasks()
        }
        if(data.error) alert(data.error)
    }


    useEffect(() => {
        getTasks() //refresh the page
    }, []);

    return (
        <div>
            <button onClick={createTask}>Crear Tareas</button>
            {
                tasks.length === 0 ? (
                    <div>No hay tareas</div>
                ) : (
                    tasks.map((task) => {
                        return <div key={task.id}>
                            <span>{task.responsable}</span>
                            <button onClick={() => deleteTask(task.id)}>x</button>
                            <button onClick={() => editTask(task.id)}>Editar</button>
                        </div>
                    })
                )
            }
            
        </div>
    )
}

export default Test
