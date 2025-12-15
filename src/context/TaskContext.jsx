/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react"

const TaskContext = createContext(null);

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || []
}

const taskReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        case "UPDATE_TASK":
            return {
                ...state,
                tasks: state.tasks.map(task => 
                    task.id === action.payload.id ? { ...task, ...action.payload } : task
                )
            }
        case "DELETE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        default:
            return state;
    }
}

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer,initialState)

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks))
    }, [state.tasks])

    return (
        <TaskContext.Provider value={{ state, dispatch }}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider')
  }
  return context
}
