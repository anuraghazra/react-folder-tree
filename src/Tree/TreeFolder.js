import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen
} from "react-icons/ai";
import {
  Actions,
  Collapse,
  StyledFolder,
  StyledFolderName,
  VerticalLine
} from "./Tree.style";
import { useTreeContext } from "./TreeContext";
import { PlaceholderInput } from "./TreePlaceholderInput";

const FolderName = ({ isOpen, name, handleClick }) => (
  <StyledFolderName onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
    &nbsp;&nbsp;{name}
  </StyledFolderName>
);

const Folder = ({ name, children, level, parentPath, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onNodeClick } = useTreeContext();
  const [childs, setChilds] = useState([]);

  // increase `level` recursively
  // defaultProps comes in on each cycle
  useEffect(() => {
    const nestedChilds = React.Children.map(children, item => {
      if (item.type === Folder) {
        return React.cloneElement(item, {
          level: level + 1,
          parentPath: `${parentPath}/${name}`
        });
      }
      return item;
    });
    setChilds(nestedChilds);
  }, [children]);

  const handleFileCreation = event => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="file"
        handleSubmit={fileName => {
          onNodeClick({
            id,
            type: "file",
            name: fileName,
            path: `${parentPath}/${name}`
          });
        }}
      />
    ]);
  };

  const handleFolderCreation = event => {
    event.stopPropagation();
    setIsOpen(true);
    setChilds([
      ...childs,
      <PlaceholderInput
        type="folder"
        folderLevel={level}
        handleSubmit={folderName => {
          onNodeClick({
            id,
            type: "folder",
            name: folderName,
            path: `${parentPath}/${name}`
          });
        }}
      />
    ]);
  };

  return (
    <StyledFolder className="tree__folder" indent={level}>
      <VerticalLine>
        <Actions>
          <FolderName
            name={name}
            isOpen={isOpen}
            handleClick={() => setIsOpen(!isOpen)}
          />

          <div className="folder__actions">
            <AiOutlineFileAdd onClick={handleFileCreation} />
            <AiOutlineFolderAdd onClick={handleFolderCreation} />
          </div>
        </Actions>
        <Collapse className="tree__folder--collapsible" isOpen={isOpen}>
          {childs}
        </Collapse>
      </VerticalLine>
    </StyledFolder>
  );
};
Folder.defaultProps = { level: 1, parentPath: "" };

export { Folder, FolderName };
