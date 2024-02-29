import React, { useState } from "react";
import './App.css';
import { TaskType, TodoList } from './Todolist';
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";




export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithReducer() {


  function removeTask(id: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let filteredTasks = todolistTasks.filter((t) => t.id !== id);
    tasks[todolistId] = filteredTasks;
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistId: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false
    };
    let todolistTasks = tasks[todolistId];
    let newTasks = [newTask, ...todolistTasks];
    tasks[todolistId] = newTasks
    setTasks({ ...tasks });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasks });
    }
  }


  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    let todolistTasks = tasks[todolistId];
    let task = todolistTasks.find(t => t.id === taskId);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {

    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ])

  let removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);

    delete tasks[todolistId];
    setTasks({ ...tasks });
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todolist = todolists.find(tl => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }


  let [tasks, setTasks] = useState<TaskStateType>({
    [todolistId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
    ]
  });

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      title: title,
      filter: 'all'
    }
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasks, [todolist.id]: [] })
  }



  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container sx={{ p: 2 }}>
          <Paper sx={{ p: 2 }}>
            <AddItemForm addItem={addTodolist} lable={'New todolist'} />
          </Paper>
        </Grid>
        <Grid container spacing={4}>
          {
            todolists.map((tl) => {
              let tasksForTodoList = tasks[tl.id];
              if (tl.filter === 'completed') {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
              }
              if (tl.filter === 'active') {
                tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
              }
              return (
                <Grid item>
                  <Paper sx={{ p: 2 }}>
                    <TodoList
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      changeTaskStatus={changeStatus}
                      changeTaskTitle={changeTaskTitle}
                      filter={tl.filter}
                      removeTodolist={removeTodolist}
                      changeTodolistTitle={changeTodolistTitle}
                    />
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </Container>

    </div >
  );
}



export default AppWithReducer;
