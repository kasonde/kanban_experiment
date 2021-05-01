import { useContext } from "react";
import TaskState from "../models/TaskState";
import "../styles/taskStateList.css";
import { AppContext } from "./AppStateProvider";
import TaskCard from "./TaskCard";

interface TaskStateProps {
  taskState: TaskState;
}

const TaskStateList = ({ taskState }: TaskStateProps) => {
  const {
    state: { tasks },
    dispatch,
  } = useContext(AppContext);

  const addNewItem = () => {
    let response = window.prompt("Add a title to this task");
    dispatch({
      action: "ADD_TASK",
      payload: {
        title: response,
        state: taskState.name,
      },
    });
  };

  return (
    <div className="taskStateList">
      <h3 className="taskStateListTitle">
        {taskState.name}
        <button className="add" onClick={() => addNewItem()}>
          Add Item
        </button>
      </h3>
      <div className="listItems">
        {tasks
          .filter((task) => task.state === taskState.name)
          .map((task) => (
            <TaskCard task={task} key={`${task.id}`} />
          ))}
      </div>
    </div>
  );
};

export default TaskStateList;
