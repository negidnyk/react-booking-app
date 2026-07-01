import {type ChangeEvent, type JSX, type ReactNode} from "react";

type Props = {
    title: string;
    children: ReactNode
    onChange: (e: ChangeEvent) => void;
}

const TaskItem = ({ title, children, onChange }: Props): JSX.Element => {
    return (

        <li className="task-item">
            <label className="task-item__label">
                <input type="checkbox" className="task-item__input" onChange={ onChange }/>
                {children}
            </label>
        </li>

    )
}
export { TaskItem }