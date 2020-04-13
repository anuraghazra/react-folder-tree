import React from "react";

const defaultValue = {
  onNodeClick: () => {}
};
const TreeContext = React.createContext(defaultValue);

const useTreeContext = () => React.useContext(TreeContext);

export { TreeContext, useTreeContext };
