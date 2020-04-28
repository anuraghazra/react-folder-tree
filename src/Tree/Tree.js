import React, { useReducer, useLayoutEffect } from "react";
import { ThemeProvider } from 'styled-components';
import { v4 } from "uuid";

import { TreeContext, reducer } from './state';

import { StyledTree } from "./Tree.style";
import { Folder } from "./Folder/TreeFolder";
import { File } from "./File/TreeFile";

import { useDidMountEffect } from "../utils";

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
    <ThemeProvider theme={{ indent: 10 }} >
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
    </ThemeProvider>
  );
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
