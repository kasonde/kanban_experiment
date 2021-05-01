import React, { useReducer } from "react";
import ReducerAction from "../models/ReducerAction";
import State from "../models/State";
import Task from "../models/Task";
import { v4 } from "uuid";

const initialState: State = {
  tasks: [
    { id: "sdfadfasdf", state: "Doing", title: "Experiment with Side-project" },
  ],
  taskStates: [{ name: "To do" }, { name: "Doing" }],
};

const appReducer = (state: State, action: ReducerAction): State => {
  switch (action.action) {
    case "SET_TASK_SATE":
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      let task: Task = state.tasks[taskIndex];
      task.state = action.payload.state;
      let allTasks = state.tasks;
      allTasks[taskIndex] = task;
      return {
        ...state,
        tasks: allTasks,
      };

    case "ADD_TASK":
      // get task title and state from action.payload
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: v4(),
            state: action.payload.state,
            title: action.payload.title,
          },
        ],
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.id),
      };

    case "EDIT_TASK":
      const editTaskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      let editingTask = state.tasks[editTaskIndex];
      editingTask.title = action.payload.title;
      let editedTasks = state.tasks;
      editedTasks[editTaskIndex] = editingTask;
      return {
        ...state,
        tasks: editedTasks,
      };
    default:
      return state;
  }
};

export const AppContext = React.createContext<{
  state: State;
  dispatch: (action: ReducerAction) => void;
}>({
  state: initialState,
  dispatch: () => {},
});

const AppStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppStateProvider;
