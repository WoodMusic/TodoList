import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "../state/todolist-reducer";
import { tasksReducer } from "../state/tasks-reducer";
import nextId from "react-id-generator";
import { AppRootState } from "../state/store";



const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

const initialGlobalState = {
    todolist: [
        { id: "todolistId1", title: "What to learn", filter: "all" },
        { id: "todolistId2", title: "What to buy", filter: "all" }
    ],
    tasks: {
        ["todolistId1"]: [
            { id: nextId, title: "HTML&CSS", isDone: true },
            { id: nextId, title: "JS", isDone: true }
        ],
        ["todolistId2"]: [
            { id: nextId, title: "Milk", isDone: true },
            { id: nextId, title: "React Book", isDone: true }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}  