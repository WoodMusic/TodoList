import './App.css';
import { TaskType, TodoList } from './Todolist';
import { AddItemForm } from "./AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolist-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";






export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootState, TaskStateType>(state => state.tasks)


  function removeTask(id: string, todolistId: string) {
    const action = removeTaskAC(id, todolistId);
    dispatch(action);
  }

  function  addTask(title: string, todolistId: string) {
    const action = addTaskAC(title, todolistId);
    dispatch(action);
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC(taskId, isDone, todolistId);
    dispatch(action);
  }


  function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
    const action = changeTaskTitleAC(taskId, newTitle, todolistId);
    dispatch(action);
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC(value, todolistId);
    dispatch(action);
  }



  let removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatch(action);
  }


  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatch(action);
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
            Todolist
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



export default AppWithRedux;
