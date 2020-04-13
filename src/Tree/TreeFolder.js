import React, { useState, useEffect } from "react";
import {
  AiOutlineFolderAdd,
  AiOutlineFileAdd,
  AiOutlineFolder,
  AiOutlineFolderOpen,
  AiOutlineDelete
} from "react-icons/ai";
import {
  ActionsWrapper,
  Collapse,
  StyledFolder,
  StyledName,
  VerticalLine
} from "./Tree.style";
import { useTreeContext } from "./TreeContext";
import { PlaceholderInput } from "./TreePlaceholderInput";

const FolderName = ({ isOpen, name, handleClick }) => (
  <StyledName onClick={handleClick}>
    {isOpen ? <AiOutlineFolderOpen /> : <AiOutlineFolder />}
    &nbsp;&nbsp;{name}
  </StyledName>
);

const Folder = ({ name, children, level, parentPath, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { onNodeClick, isImparative } = useTreeContext();
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
            action: "create",
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
            action: "create",
            name: folderName,
            path: `${parentPath}/${name}`
          });
        }}
      />
    ]);
  };

  const handleDeleteFolder = () => {
    onNodeClick({ id, action: "delete", type: "folder" });
  };

  return (
    <StyledFolder className="tree__folder" indent={level}>
      <VerticalLine>
        <ActionsWrapper>
          <FolderName
            name={name}
            isOpen={isOpen}
            handleClick={() => setIsOpen(!isOpen)}
          />

          {isImparative && (
            <div className="actions">
              <AiOutlineFileAdd onClick={handleFileCreation} />
              <AiOutlineFolderAdd onClick={handleFolderCreation} />
              <AiOutlineDelete onClick={handleDeleteFolder} />
            </div>
          )}
        </ActionsWrapper>
        <Collapse className="tree__folder--collapsible" isOpen={isOpen}>
          {childs}
        </Collapse>
      </VerticalLine>
    </StyledFolder>
  );
};
Folder.defaultProps = { level: 1, parentPath: "" };

export { Folder, FolderName };
