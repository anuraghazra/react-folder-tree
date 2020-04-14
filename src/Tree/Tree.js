import React, { useReducer, useLayoutEffect } from "react";
import { v4 } from "uuid";
import _cloneDeep from "lodash.clonedeep";

import { TreeContext } from "./TreeContext";
import { StyledTree } from "./Tree.style";
import { Folder } from "./TreeFolder";
import { File } from "./TreeFile";
import {
  searchDFS,
  createFile,
  createFolder,
  useDidMountEffect
} from "../utils";

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

const Tree = ({ children, data, onNodeClick, onUpdate }) => {
  const [state, dispatch] = useReducer(reducer, data);

  useLayoutEffect(() => {
    dispatch({ type: "SET_DATA", payload: data });
  }, [data]);

  useDidMountEffect(() => {
    onUpdate && onUpdate(state);
  }, [state]);

  const makeComponents = React.useCallback(
    data => {
      return data.map(item => {
        item.id = v4();

        // root files
        if (item.type === "file") {
          return <File key={item.id} id={item.id} name={item.name} />;
        }
        return (
          <Folder id={item.id} name={item.name}>
            {item.files &&
              item.files.map(file => {
                file.id = v4();
                file.parent = item; // reference to the parent folder
                if (file.type === "folder") {
                  return makeComponents([file]);
                }
                return (
                  <File
                    parent={item}
                    id={file.id}
                    key={file.id}
                    name={file.name}
                  />
                );
              })}
          </Folder>
        );
      });
    },
    [state]
  );

  const isImparative = data && !children;

  return (
    <TreeContext.Provider
      value={{
        isImparative,
        state,
        dispatch,
        onNodeClick: path => {
          onNodeClick && onNodeClick(path);
        }
      }}
    >
      <StyledTree>{isImparative ? makeComponents(state) : children}</StyledTree>
    </TreeContext.Provider>
  );
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
