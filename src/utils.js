import { useRef, useEffect } from "react";

export const findNodeById = (nodes, id) => {
  let final;

  function findNode(nodes, id) {
    nodes.forEach(n => {
      if (n.id === id) {
        final = n;
        return;
      }
      if (n.files) findNode(n.files, id);
    });
  }

  findNode(nodes, id);

  return final;
};

export const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export const createFile = ({ name }) => ({ name, type: "file" });
export const createFolder = ({ name }) => ({ name, type: "folder", files: [] });
