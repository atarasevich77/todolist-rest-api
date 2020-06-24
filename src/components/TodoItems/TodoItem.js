import React, {useEffect, useRef, useState} from 'react';

const cancelLogo = <svg className="bi bi-x-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
    <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
</svg>;

const acceptLogo = <svg className="bi bi-check-square" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
    <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
</svg>;

const TodoItem = (props) => {
    const nameNode = useRef(null);
    const descNode = useRef(null);
    const [todo, setTodo] = useState(props.todo);
    const [name, setName] = useState(props.todo.name);
    const [desc, setDesc] = useState(props.todo.description);
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

    const onUpdate = (e) => {
        e.preventDefault();
        todo['name'] = name;
        todo['description'] = desc;
        props.onUpdate(todo);
        setTodo(todo);
        setFieldEditMode('');
    }

    const onDelete = () => {
        props.onDelete(todo._id);
    }

    const onClose = () => {
        setTodo(props.todo);
        setName(props.todo.name);
        setDesc(props.todo.description);
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
                <input type="checkbox" className="mt-3"
                       value={todo.done}
                       onChange={onStatusChange}
                       checked={todo.done}
                />
            </td>
            <td className="w-50" ref={el => nameNode.current = el}>
                {fieldEditMode === 'name' ?
                    <div className="input-group">
                        <input type="text" className="form-control" aria-label="Title"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" onClick={onClose}>{cancelLogo}</span>
                            <span className="input-group-text" onClick={onUpdate}>{acceptLogo}</span>
                        </div>
                    </div>
                    :
                    <span className="input-group-text"
                          onDoubleClick={() => editMode("name")}
                          style={isDoneStyle}
                    >
                        {name}
                    </span>
                }
            </td>
            <td className="w-50" ref={el => descNode.current = el}>
                {fieldEditMode === 'desc' ?
                    <div className="input-group">
                        <input type="text" className="form-control" aria-label="Description"
                               value={desc}
                               onChange={(e) => setDesc(e.target.value)}
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" onClick={onClose}>{cancelLogo}</span>
                            <span className="input-group-text" onClick={onUpdate}>{acceptLogo}</span>
                        </div>
                    </div>
                    :
                    <span className="input-group-text"
                          onDoubleClick={() => editMode("desc")}
                          style={isDoneStyle}
                    >
                        {desc}
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