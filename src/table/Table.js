import React from 'react';
import SVGEdit from '../components/icons/SVGEdit';
import SVGDelete from '../components/icons/SVGDelete';
import Swal from 'sweetalert2';
import './styles.scss';


const API = 'https://api-tasks.vercel.app/api';

const Table = (props) => {

    const { tasks, taskId, setTaskId, getTasks } = props;

    const deleteTask = async (id) => { //We delete the task using the ID.

        Swal.fire({
            title: "¿Estás seguro?",
            text: "El siguiente registro será eliminado",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
        }).then(async (result) => {
            
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API}/task/${id}`, { method: "DELETE", }); //We delete the task using the ID.
                    const data = await response.json();
                    Swal.fire({
                        icon: 'success',
                        title: 'Felicitaciones',
                        text: data.success
                    }).then(() => getTasks()) //refresh the page (useEffect)

                } catch (error) {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "error",
                    });
                }
            }
        });

    }

    return (

        <table className="table">
            <thead>
                <tr className="table__headers">
                    <th>ID</th>
                    <th>responsible</th>
                    <th>Descripción</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    tasks.length === 0 ? (

                        <div className="no__tasks">No hay tareas</div>) : (

                            tasks.map((task) => {
                                return <tr key={task.id}>
                                    <td className="table__row__1">{task.id}</td>
                                    <td className="table__row__2">{task.responsible}</td>
                                    <td className="table__row__3">{task.description}</td>
                                    <td className="table__row__options">
                                        <div>
                                            <span onClick={() => setTaskId(task.id)}>
                                                <SVGEdit
                                                    size={15}
                                                    color={taskId && task.id === taskId ? "#fafafa" : undefined}
                                                />
                                            </span>
                                            <span onClick={() => deleteTask(task.id)} className={taskId && "d-none"}>
                                                <SVGDelete
                                                    size={15}
                                                    color="rgb(237, 44, 102)"
                                                />
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            })
                        )
                }
            </tbody>
        </table>

    )
}

export default Table
