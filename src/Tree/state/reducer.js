import _cloneDeep from "lodash.clonedeep";
import {
  searchDFS,
  createFile,
  createFolder,
} from "../../utils";

const reducer = (state, action) => {
  let newState = _cloneDeep(state);
  let node = null;
  let parent = null;
  if (action.payload && action.payload.id) {
    let foundNode = searchDFS({
      data: newState,
      cond: item => {
        return item.id === action.payload.id;
      }
    });
    parent = foundNode.parent;
    node = foundNode.item;
  }

  switch (action.type) {
    case "SET_DATA":
      return action.payload;
    case "CREATE_FILE":
      node.files.push(createFile({ name: action.payload.name }));
      return newState;
    case "EDIT_FILE":
      node.name = action.payload.name;
      return newState;
    case "DELETE_FILE":
      if (!parent) {
        newState = newState.filter(file => file.id !== action.payload.id);
        return newState;
      } else {
        parent.files = parent.files.filter(
          file => file.id !== action.payload.id
        );
      }
      return newState;

    case "CREATE_FOLDER":
      node.files.push(createFolder({ name: action.payload.name }));
      return newState;
    case "RENAME_FOLDER":
      node.name = action.payload.name;
      console.log(action);
      return newState;
    case "DELETE_FOLDER":
      if (!parent) {
        newState = newState.filter(item => item.id !== action.payload.id);
      } else {
        parent.files = parent.files.filter(
          item => item.id !== action.payload.id
        );
      }
      return newState;
    default:
      return state;
  }
};


export { reducer }