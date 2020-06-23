import React, {useEffect, useState} from 'react';
import api from './api/config';
import CreateForm from "./components/CreateForm/CreateForm";
import TodoItem from "./components/TodoItems/TodoItem";

function App() {
    const [todos, setTodos] = useState([]);

    const getAllTodos = () => {
        api.get('/todo')
            .then(response => {
                setTodos(response.data)
            })
            .catch(errors =>
                console.log(errors)
            )
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
            <h1 className="text-center p-2">ToDo list {new Date().toDateString()}</h1>
            <div className="row justify-content-center p-2">
                <CreateForm createTodo={createTodo}/>
            </div>
            <div className="row justify-content-center">
                <table className="table w-75">
                    <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo._id}>
                                <TodoItem todo={todo}
                                          onStatusChange={onStatusChange}
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
