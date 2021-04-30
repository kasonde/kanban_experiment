import Task from "./Task";
import TaskState from "./TaskState";

export default interface State {
  taskStates: TaskState[];
  tasks: Task[];
}
