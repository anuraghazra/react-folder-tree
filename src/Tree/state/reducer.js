import _cloneDeep from "lodash.clonedeep";
import { searchDFS, createFile, createFolder } from "utils";
import { FILE, FOLDER } from "./constants";

const reducer = (state, action) => {
  let newState = _cloneDeep(state);
  let node = null;
  let parent = null;
  if (action.payload && action.payload.id) {
    let foundNode = searchDFS({
      data: newState,
      cond: (item) => {
        return item.id === action.payload.id;
      },
    });
    node = foundNode.item;
    parent = node.parentNode;
  }

  switch (action.type) {
    case "SET_DATA":
      return action.payload;

    case FILE.CREATE:
      node.files.push(createFile({ name: action.payload.name }));
      return newState;

    case FOLDER.CREATE:
      node.files.push(createFolder({ name: action.payload.name }));
      return newState;

    case FOLDER.EDIT:
    case FILE.EDIT:
      node.name = action.payload.name;
      return newState;

    case FOLDER.DELETE:
    case FILE.DELETE:
      if (!parent || Array.isArray(parent)) {
        newState = newState.filter((file) => file.id !== action.payload.id);
        return newState;
      } else {
        parent.files = parent.files.filter(
          (file) => file.id !== action.payload.id
        );
      }
      return newState;

    default:
      return state;
  }
};

export { reducer };
