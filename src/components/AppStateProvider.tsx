import React from "react";
import State from "../models/State";

const initialState: State = { tasks: [], taskStates: [] };

export const AppContext = React.createContext(initialState);

const AppStateProvider = () => {
  return <div></div>;
};

export default AppStateProvider;
