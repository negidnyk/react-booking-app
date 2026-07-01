import {type ChangeEvent, type JSX} from "react";
import { TaskItem } from "../task-item/task-item"

const items = [
    {
        id: 1,
        title: 'Finish with the task',
    },
    {
        id: 2,
        title: 'Buy groceries',
    },
    {
        id: 3,
        title: 'Prepare for the exam',
    },
]

const TaskList: JSX.Element = () => {

    const handelChange = (e: ChangeEvent) => {
        console.log(e);
    }

    return (
        <>
            <ul className="task-list" style={{ listStyleType: 'none' }}>
                {items.map(({id, title}) => {
                    return <TaskItem key={id} title={ title } onChange={ handelChange }>
                        <strong>{title}</strong>
                    </TaskItem>
                })}

            </ul>
        </>
    )
}

export { TaskList }