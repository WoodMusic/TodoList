import './App.css';
import { TaskType, TodoList } from './Todolist';
import { AddItemForm } from "./AddItemForm";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolist-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { useCallback } from 'react';






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
  console.log('APP is called');

  const dispatch = useDispatch();

  const todolists = useSelector<AppRootState, Array<TodolistType>>(state => state.todolists)


  //TASKS

  //FILTER

  const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
    const action = changeTodolistFilterAC(value, todolistId);
    dispatch(action);
  }, [dispatch])

  //TODOLIST

  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatch(action);
  }, [dispatch])

  const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatch(action);
  }, [dispatch])


  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch]);


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
            <AddItemForm addItem={addTodolist} label={'New todolist'} />
          </Paper>
        </Grid>
        <Grid container spacing={4}>
          {
            todolists.map((tl) => {

              return (
                <Grid item>
                  <Paper sx={{ p: 2 }}>
                    <TodoList
                      key={tl.id}
                      id={tl.id}
                      title={tl.title}
                      changeFilter={changeFilter}
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