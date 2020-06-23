import React, {useState} from 'react';

const CreateForm = (props) => {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        props.createTodo({name, desc});
        setName('')
        setDesc('');
    }

    return (
        <form className="form-inline">
            <div className="form-group mb-2">
                <input type="text" className="form-control"
                       value={name}
                       onChange={(e) => setName(e.target.value)}
                       placeholder="Title"
                />
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <input type="text" className="form-control"
                       value={desc}
                       onChange={(e) => setDesc(e.target.value)}
                       placeholder="Description"
                />
            </div>
            <button className="btn btn-success mb-2" onClick={onSubmit}>Add</button>
        </form>
    );
};

export default CreateForm;