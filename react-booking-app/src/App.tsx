import {type JSX, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import  { TaskList } from "./components/task-list/task-list.tsx";
import { AddTaskForm } from "./components/add-task-form/add-task-form.tsx";

function App(): JSX.Element {

  return (
      <>
        <main>
          <h1>To do list</h1>
            <AddTaskForm />
            <TaskList />
        </main>

      </>
)

}

export default App
