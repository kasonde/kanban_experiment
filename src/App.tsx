import AppStateProvider from "./components/AppStateProvider";
import TaskStateContainer from "./components/TaskStateContainer";
import "./styles/App.css";

const App = () => {
  return (
    <AppStateProvider>
      <div className="appContainer">
        <TaskStateContainer />
      </div>
    </AppStateProvider>
  );
};

export default App;
