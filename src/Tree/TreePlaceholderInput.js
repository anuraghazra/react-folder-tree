import React, { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { AiOutlineFile } from "react-icons/ai";

import { StyledFile, StyledFolder } from "./Tree.style";
import { FolderName } from "./TreeFolder";
import FILE_ICONS from "./FileIcons";

const PlaceholderInput = ({ type, name, folderLevel, handleSubmit }) => {
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
    <StyledFile className="tree__file">
      {FILE_ICONS[ext] ? FILE_ICONS[ext] : <AiOutlineFile />}
      &nbsp;&nbsp;
      <input ref={inputRef} onChange={updateExt} />
    </StyledFile>
  ) : (
    <StyledFolder id={v4()} name={name} indent={folderLevel + 1}>
      <FolderName
        isOpen={true}
        handleClick={() => {}}
        name={<input ref={inputRef} />}
      />
    </StyledFolder>
  );
};

export { PlaceholderInput };
