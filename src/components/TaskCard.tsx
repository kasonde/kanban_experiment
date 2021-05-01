import { useContext, useState } from "react";
import Task from "../models/Task";
import "../styles/taskCard.css";
import { AppContext } from "./AppStateProvider";

interface TaskCardProps {
  task: Task;
}
const TaskCard = ({ task }: TaskCardProps) => {
  const {
    state: { taskStates },
    dispatch,
  } = useContext(AppContext);
  const [isEditing, setEditing] = useState(false);
  const [taskText, setTaskText] = useState(task.title);

  const deleteItem = () => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch({
        action: "DELETE_TASK",
        payload: {
          id: task.id,
        },
      });
    }
  };

  const saveItem = () => {
    let confirm = window.confirm("Are you sure?");
    if (confirm) {
      dispatch({
        action: "EDIT_TASK",
        payload: {
          id: task.id,
          title: taskText,
        },
      });
      setEditing(false);
    }
  };

  return (
    <div className="taskCard">
      <div className="title">
        {isEditing ? (
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
        ) : (
          task.title
        )}
      </div>
      <div className="controls">
        <button onClick={deleteItem} className="delete">
          Delete
        </button>
        {isEditing ? (
          <button onClick={saveItem} className="save">
            Save
          </button>
        ) : (
          <button onClick={() => setEditing(true)} className="edit">
            Edit
          </button>
        )}
      </div>
      <div className="stateSelector">
        {taskStates.map((taskState) => {
          return (
            <label key={`${taskState.name}`}>
              <input
                checked={taskState.name === task.state}
                type="checkbox"
                onChange={(event: any) =>
                  dispatch({
                    action: "SET_TASK_SATE",
                    payload: { id: task.id, state: event.target.value },
                  })
                }
                value={taskState.name}
              />
              {taskState.name}
            </label>
          );
        })}
      </div>
    </div>
  );
};
export default TaskCard;
