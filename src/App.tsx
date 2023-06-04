


import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type TodolistsType ={
  id: string;
  title: string;
  filter: FilterValuesType;
}
type TasksType={
  [key: string]: Array<TaskType>
}

function App() {
  let todolistID1 = v1() // '12ed-1212-dfed-wqqwqw'
  let todolistID2 = v1() // '12ed-1212-dfed-wqqwqw'

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: "What to learn", filter: "all"},
    {id: todolistID2, title: "What to buy", filter: "all"},
  ])

  let [tasks, setTasks] = useState<TasksType>({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Rest API', isDone: false},
      {id: v1(), title: 'Graph SQL', isDone: false},

    ],
    [todolistID2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Fruits', isDone: true},
      {id: v1(), title: 'Nuts', isDone: true},
      {id: v1(), title: 'Bread', isDone: false},
      {id: v1(), title: 'Sugar', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'Milk', isDone: true},
      {id: v1(), title: 'Fruits', isDone: true},
      {id: v1(), title: 'Nuts', isDone: true},
      {id: v1(), title: 'Bread', isDone: false},
      {id: v1(), title: 'Sugar', isDone: false},
    ]
  })
  function removeTask(todolistID: string, taskID: string) {
    setTasks({...tasks, [todolistID]:tasks[todolistID].filter(el => el.id !== taskID)})
  }

  console.log(tasks['12ed-1212-dfed-wqqwqw'])
  console.log(tasks['todolistID2'])
  console.log(tasks)
  function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
    setTasks({...tasks, [todolistID2]:tasks[todolistID2].map(el => el.id === taskId ? {...el, isDone:newIsDone} : el)})
  }

  return (
      <div className="App">
        {todolists.map(el=>{
          let tasksForTodolist = tasks[el.id];
          if (el.filter === "active") {
            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
          }
          if (el.filter === "completed") {
            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
          }
          return <Todolist
              key={el.id}
              todolistID={el.id}
              title={el.title}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              changeTaskStatus={changeStatus}
          />
        })}
      </div>
  );
}

export default App;