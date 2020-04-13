import React, { useRef } from "react";
import { AiOutlineFile } from "react-icons/ai";
import { StyledFile } from "./Tree.style";
import FILE_ICONS from "./FileIcons";

const File = ({ name }) => {
  const ext = useRef("");

  let splitted = name && name.split(".");
  ext.current = splitted && splitted[splitted.length - 1];

  return (
    <StyledFile className="tree__file">
      {FILE_ICONS[ext.current] ? FILE_ICONS[ext.current] : <AiOutlineFile />}
      &nbsp;&nbsp;{name}
    </StyledFile>
  );
};

export { File };
