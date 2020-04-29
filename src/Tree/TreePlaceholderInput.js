import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { AiOutlineFile } from "react-icons/ai";

import FILE_ICONS from "./FileIcons";
import { StyledFile } from "Tree/File/TreeFile.style";
import { FolderName } from "Tree/Folder/TreeFolder";
import { StyledFolder } from "Tree/Folder/TreeFolder.style";

const FileEdit = ({ ext, inputRef, updateExt, defaultValue, style }) => {
  const extension = FILE_ICONS[ext] ? FILE_ICONS[ext] : <AiOutlineFile />;

  return (
    <StyledFile className="tree__file" style={style}>
      {extension}
      &nbsp;&nbsp;
      <input
        ref={inputRef}
        onChange={updateExt}
        defaultValue={defaultValue}
        className="tree__input"
      />
    </StyledFile>
  );
};

const FolderEdit = ({ name, inputRef, defaultValue, style }) => {
  return (
    <StyledFolder id={v4()} name={name} style={style}>
      <FolderName
        isOpen={true}
        handleClick={() => {}}
        name={
          <input
            ref={inputRef}
            className="tree__input"
            defaultValue={defaultValue}
          />
        }
      />
    </StyledFolder>
  );
};

const PlaceholderInput = ({
  type,
  name,
  onSubmit,
  onCancel,
  defaultValue,
  style,
}) => {
  const [ext, setExt] = useState("");
  const inputRef = useRef();

  const updateExt = (e) => {
    let splitted = e.target.value.split(".");
    let ext = splitted && splitted[splitted.length - 1];
    setExt(ext);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.addEventListener("keyup", (e) => {
      if (e.key === "Enter") onSubmit(e.target.value);
      if (e.key === "Escape") {
        onCancel && onCancel();
      }
    });
  }, [inputRef]);

  return type === "file" ? (
    <FileEdit
      ext={ext}
      style={style}
      updateExt={updateExt}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  ) : (
    <FolderEdit
      style={style}
      name={name}
      inputRef={inputRef}
      defaultValue={defaultValue}
    />
  );
};

export { PlaceholderInput };
