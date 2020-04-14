import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { AiOutlineFile } from "react-icons/ai";

import { StyledFile, StyledFolder } from "./Tree.style";
import { FolderName } from "./TreeFolder";
import FILE_ICONS from "./FileIcons";

const PlaceholderInput = ({
  type,
  name,
  folderLevel,
  handleSubmit,
  defaultValue,
  style
}) => {
  const [ext, setExt] = useState("");
  const inputRef = useRef();

  const updateExt = e => {
    let splitted = e.target.value.split(".");
    let ext = splitted && splitted[splitted.length - 1];
    setExt(ext);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    inputRef.current.addEventListener("keypress", e => {
      if (e.key === "Enter") {
        handleSubmit(e.target.value);
      }
      if (e.key === "Esc") {
        return;
      }
    });
  }, [inputRef, handleSubmit]);

  return type === "file" ? (
    <StyledFile className="tree__file" style={style}>
      {FILE_ICONS[ext] ? FILE_ICONS[ext] : <AiOutlineFile />}
      &nbsp;&nbsp;
      <input
        className="tree__input"
        defaultValue={defaultValue}
        ref={inputRef}
        onChange={updateExt}
      />
    </StyledFile>
  ) : (
    <StyledFolder id={v4()} name={name} indent={folderLevel + 1} style={style}>
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

export { PlaceholderInput };
