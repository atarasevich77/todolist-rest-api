import React, {useEffect, useRef, useState} from 'react';

const TodoItem = (props) => {
    const nameNode = useRef(null);
    const descNode = useRef(null);
    const [todo, setTodo] = useState(props.todo);
    const [fieldEditMode, setFieldEditMode] = useState('');

    const isDoneStyle = {
        textDecoration: todo.done ? 'line-through' : '',
        color: todo.done ? 'green' : ''
    }

    const editMode = (field) => {
        setFieldEditMode(field);
    }

    const onStatusChange = (e) => {
        todo['done'] = e.target.checked;
        props.onStatusChange(todo);
    }

    const onDelete = () => {
        props.onDelete(todo._id);
    }

    const onClose = () => {
        setTodo(props.todo);
        setFieldEditMode('');
    }

    const handleClick = (e) => {
        if(nameNode.current.contains(e.target) || descNode.current.contains(e.target)){
            return;
        }
        onClose();
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [todo]);

    return (
        <>
            <td>
                <input type="checkbox" className="mt-3" value={todo.done}
                       onChange={onStatusChange}
                       checked={todo.done}
                />
            </td>
            <td className="w-50" ref={el => nameNode.current = el}>
                {fieldEditMode === 'name' ?
                    <div className="input-group">
                        <input type="text" className="form-control" aria-label="Title"
                               value={todo.name}
                               onChange={(e) => setTodo({...todo, name: e.target.value})}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Button</button>
                            <button className="btn btn-outline-secondary" type="button">Button</button>
                        </div>
                    </div>
                    :
                    <span className="input-group-text"
                          onDoubleClick={() => editMode("name")}
                          style={isDoneStyle}
                    >
                        {todo.name}
                    </span>
                }
            </td>
            <td className="w-50" ref={el => descNode.current = el}>
                {fieldEditMode === 'desc' ?
                    <div className="input-group">
                        <input type="text" className="form-control" aria-label="Description"
                               value={todo.description}
                               onChange={(e) => setTodo({...todo, description: e.target.value})}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button">Button</button>
                            <button className="btn btn-outline-secondary" type="button">Button</button>
                        </div>
                    </div>
                    :
                    <span className="input-group-text"
                          onDoubleClick={() => editMode("desc")}
                          style={isDoneStyle}
                    >
                        {todo.description}
                    </span>
                }
            </td>
            <td>
                <button className="btn btn-secondary ml-auto" onClick={onDelete}>Delete</button>
            </td>
        </>
    );
};

export default TodoItem;