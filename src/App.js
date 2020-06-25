import React, {useEffect, useState} from 'react';
import api from './api/config';
import CreateForm from "./components/CreateForm/CreateForm";
import TodoItem from "./components/TodoItems/TodoItem";

function App() {
    const [servStatus, setServStatus] = useState(false);
    const [todos, setTodos] = useState([]);

    const statusStyle = {
        color: servStatus ? 'green' : 'red'
    }

    const getAllTodos = () => {
        api.get('/todo')
            .then(response => {
                setTodos(response.data)
                setServStatus(true);
            })
            .catch(errors =>{
                console.log(errors);
                setServStatus(false);
            })
    }

    const createTodo = (todo) => {
        api.post('/todo', {
                name: todo.name,
                description: todo.desc
            })
            .then(() => {
                getAllTodos();
            })
            .catch(errors =>
                console.log(errors)
            )
    }

    const onStatusChange = (todo) => {
        api.put(`/todo/${todo._id}`, {
            done: todo.done,
        })
            .then(() => {
                getAllTodos();
            })
            .catch(errors =>
                console.log(errors)
            )
    }

    const onUpdate = (todo) => {
        api.patch(`/todo/${todo._id}`, {
            name: todo.name,
            description: todo.description,
            done: todo.done
        })
            .then(() => {
                getAllTodos();
            })
            .catch(errors =>
                console.log(errors)
            )
    }

    const onDelete = (id) => {
        api.delete(`/todo/${id}`)
            .then(() => {
                getAllTodos();
            })
            .catch(errors =>
                console.log(errors)
            )
    }

    useEffect(() => {
        getAllTodos();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row justify-content-sm-end p-2">Server status: &nbsp; <span style={statusStyle}>{servStatus ? 'OK' : 'Down'}</span></div>
            <h1 className="text-center p-2">ToDo list {new Date().toDateString()}</h1>
            <div className="row justify-content-center p-2">
                <CreateForm createTodo={createTodo}/>
            </div>
            <div className="row justify-content-center">
                <table className="table w-75">
                    <tbody>
                    {
                        todos.map((todo, index) =>
                            <tr key={index}>
                                <TodoItem todo={todo}
                                          onStatusChange={onStatusChange}
                                          onUpdate={onUpdate}
                                          onDelete={onDelete}
                                />
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
