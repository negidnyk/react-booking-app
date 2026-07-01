import {type ChangeEvent, type FormEvent, useState} from "react";

type Props = {
    onSubmit: (name: string ) => void;
}


const AddTaskForm = ({ onSubmit: Props }) => {

    const [name, setName] = useState('')

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>)=> {
        setName(e.target.value)
    }

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();

        if (name.trim() === '') {
            return;
        }

        onSubmit(name);
        setName('');
    }

    return (
        <form className="add-task">
            <label className="add-task__label">
                Name
                <input
                    type="text"
                    value={name}
                    onChange={ handleNameChange }
                    className="add-task__input"
                />
            </label>
            <button className="add-task__button">Add Task</button>
        </form>
    );
};

export { AddTaskForm };