import React, { useState, useEffect } from 'react';
import FormInput from './FormInput';
import Button from '../components/buttons/Button';
import Swal from 'sweetalert2';
import './styles.scss';

const API = 'https://api-tasks.vercel.app/api';


const Form = (props) => {

    const { tasks, taskId, setTaskId, getTasks } = props;

    const [form, setForm] = useState({
        responsible: "",
        description: ""
    });

    const editTask = async () => {
        try {
            const { responsible, description } = form;
            const response = await fetch(`${API}/task/${taskId}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": "application/json", //headers (objeto): dice al sistema que ese está enviando un dato de tipo JSON.
                },
                body: JSON.stringify({
                    responsible,
                    description,
                })

            });
            const data = await response.json();
            Swal.fire({
                icon: "success",
                title: "Felicitaciones",
                text: data.success,
            }).then(() => {
                getTasks()
                resetForm()

            })

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error",
            });
        }

    };

    const createTask = async () => {
        const { responsible, description } = form;
        const config = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json", //Indica qué tipo de info le estamos enviando, en este caso un application/json
            },
            body: JSON.stringify({
                responsible,
                description,
            })
        };
        const response = await fetch(`${API}/task`, config); // POST
        const data = await response.json();
        if (data.error) alert(data.error)

        else {
            Swal.fire({
                icon: 'success',
                title: 'Felicitaciones',
                text: data.success
            });
            getTasks()
            resetForm()
        }
    };

    const resetForm = () => {
        setForm({
            responsible: "",
            description: ""
        })
        setTaskId(null);
    };

    const formValidation = (task, success) => {
        const { responsible, description } = task;

        if (responsible.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tu nombre debe contener más de 3 letras',
            });
        } else if (description.length < 3) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'La descripción debe contener más de 3 letras',
            });
        } else {
            success();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskId) {
            formValidation(form, createTask);
        } else {
            formValidation(form, editTask);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value }) /* Spread operator creates an independent clone for inputs in the Form */

    };

    useEffect(() => {
        const selected = tasks.filter(taskSelected => taskSelected.id === taskId) //taskSelected only lives here, in the filter (scope)
        taskId && setForm(selected[0])
    }, [taskId, tasks]);

    return (
        <form onSubmit={handleSubmit} onReset={resetForm}>
            <div className="form__card">
                <h1 className="form__header" > {taskId !== null ? "Edición" : "Creación"} de tareas</h1>

                <FormInput
                    label="responsible"
                    id="responsibleInput"
                    value={form.responsible}
                    handleChange={handleChange}
                    name="responsible"
                    placeholder="Francisco"
                />

                <FormInput
                    type="textArea"
                    label="Descripción"
                    id="descriptionInput"
                    value={form.description}
                    handleChange={handleChange}
                    name="description"
                    placeholder="Crear lista de TO-DO"
                />

                <Button
                    type="submit"
                    color={taskId ? "success" : "primary"}
                    text={`${taskId ? "Editar" : "Crear"} Tarea`}
                />
                {taskId && <Button color="danger" text="Cancelar" type="reset" />}

            </div>
        </form>

    )
}

export default Form