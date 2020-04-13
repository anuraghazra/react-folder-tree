import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

import { StyledFile } from "./Tree.style";
import { useTreeContext } from "./TreeContext";
import { ActionsWrapper, StyledName } from "./Tree.style.js";
import { PlaceholderInput } from "./TreePlaceholderInput";
import FILE_ICONS from "./FileIcons";

const File = ({ name, id, parentId }) => {
  const [isEditing, setEditing] = useState(false);
  const { onNodeClick, isImparative } = useTreeContext();
  const ext = useRef("");

  let splitted = name && name.split(".");
  ext.current = splitted && splitted[splitted.length - 1];

  return (
    <StyledFile className="tree__file">
      {isEditing ? (
        <PlaceholderInput
          defaultValue={name}
          type="file"
          style={{ marginLeft: 0 }}
          handleSubmit={fileName => {
            onNodeClick({
              id,
              type: "file",
              action: "edit",
              name: fileName
            });
            setEditing(false);
          }}
        />
      ) : (
        <ActionsWrapper>
          <StyledName>
            {FILE_ICONS[ext.current] ? (
              FILE_ICONS[ext.current]
            ) : (
              <AiOutlineFile />
            )}
            &nbsp;&nbsp;{name}
          </StyledName>
          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={() => setEditing(!isEditing)} />
              <AiOutlineDelete
                onClick={() => {
                  onNodeClick({ parentId, id, action: "delete", type: "file" });
                }}
              />
            </div>
          )}
        </ActionsWrapper>
      )}
    </StyledFile>
  );
};

export { File };
