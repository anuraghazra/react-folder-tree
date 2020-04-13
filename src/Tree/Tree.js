import React from "react";
import { v4 } from "uuid";
import { TreeContext } from "./TreeContext";

import { StyledTree } from "./Tree.style";
import { Folder } from "./TreeFolder";
import { File } from "./TreeFile";

const Tree = ({ children, data, onNodeClick }) => {
  const makeComponents = data => {
    return data.map(item => {
      item.id = v4();

      // root files
      if (item.type === "file") {
        return <File id={item.id} name={item.name} />;
      }
      return (
        <Folder id={item.id} name={item.name}>
          {item.files &&
            item.files.map((file, index) => {
              file.id = v4();
              file.parentId = item.id;
              if (file.type === "folder") {
                return makeComponents([file]);
              }
              return (
                <File
                  id={file.id}
                  parentId={file.parentId}
                  key={index}
                  name={file.name}
                />
              );
            })}
        </Folder>
      );
    });
  };

  const isImparative = data && !children;

  return (
    <TreeContext.Provider
      value={{
        isImparative,
        onNodeClick: path => {
          onNodeClick && onNodeClick(path);
        }
      }}
    >
      <StyledTree>{isImparative ? makeComponents(data) : children}</StyledTree>
    </TreeContext.Provider>
  );
};

Tree.File = File;
Tree.Folder = Folder;

export default Tree;
