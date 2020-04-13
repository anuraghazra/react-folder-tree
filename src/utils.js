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

export const findPrevNodeById = (nodes, id) => {
  let final;
  let prev = [];
  let parent = [];

  function findNode(nodes, id) {
    nodes.forEach(n => {
      if (n.type === "folder") {
        prev.push(parent[parent.length - 1]);
      }
      if (n.id === id) {
        final = n;
        return;
      }
      if (n.files) {
        n.files.forEach(n => {
          if (n.type === "folder") {
            parent.push(n);
          }
        });
        findNode(n.files, id);
      }
    });
  }

  findNode(nodes, id);

  return prev[prev.length - 1];
};

export const createFile = ({ name }) => ({ name, type: "file" });
export const createFolder = ({ name }) => ({ name, type: "folder", files: [] });
