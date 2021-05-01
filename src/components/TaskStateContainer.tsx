import { useContext } from "react";
import "../styles/taskStateContainer.css";
import { AppContext } from "./AppStateProvider";
import TaskStateList from "./TaskStateList";

const TaskStateContainer = () => {
  const {
    state: { taskStates },
  } = useContext(AppContext);
  return (
    <div className="taskStateContainer">
      {taskStates.map((taskState) => {
        return (
          <TaskStateList key={`${taskState.name}`} taskState={taskState} />
        );
      })}
    </div>
  );
};

export default TaskStateContainer;
