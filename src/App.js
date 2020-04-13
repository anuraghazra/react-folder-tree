import React, { useState } from "react";
import "./styles.css";
import Tree from "./Tree/Tree";
import _cloneDeep from "lodash.clonedeep";
import { createFolder, createFile, findNodeById } from "./utils";

export default function App() {
  const [structure, setStructure] = useState([
    {
      type: "folder",
      name: "client",
      files: [
        {
          type: "folder",
          name: "ui",
          files: [
            { type: "file", name: "Button.js" },
            { type: "file", name: "Button.style.js" }
          ]
        },
        {
          type: "folder",
          name: "components",
          files: [
            { type: "file", name: "Tree.js" },
            { type: "file", name: "Tree.style.js" }
          ]
        },
        { type: "file", name: "setup.js" }
      ]
    },
    {
      type: "folder",
      name: "packages",
      files: [
        {
          type: "file",
          name: "main.js"
        }
      ]
    },
    { type: "file", name: "index.js" }
  ]);

  const handleClick = props => {
    let newpath = _cloneDeep(structure);
    let found = findNodeById(newpath, props.id);

    if (props.type === "file") {
      found.files.push(createFile({ name: props.name }));
    }
    if (props.type === "folder") {
      found.files.push(createFolder({ name: props.name }));
    }
    setStructure(newpath);
  };

  return (
    <div className="App">
      <h2>Imparative API (editable)</h2>

      <Tree onNodeClick={handleClick} data={structure} />

      <h2>Declarative API</h2>
      <Tree>
        <Tree.Folder name="src">
          <Tree.Folder name="lib">
            <Tree.Folder name="controllers">
              <Tree.File name="Post.js" />
            </Tree.Folder>
            <Tree.Folder name="middlewares">
              <Tree.File name="auth.js" />
              <Tree.File name="logger.js" />
              <Tree.File name="User.js" />
            </Tree.Folder>
            <Tree.File name="Vue.js" />
            <Tree.File name="React.js" />
          </Tree.Folder>
          <Tree.File name="Card.js" />
          <Tree.File name="Button.js" />
        </Tree.Folder>
        <Tree.File name="index.html" />
        <Tree.File name="server.js" />
        <Tree.File name="style.css" />
      </Tree>
    </div>
  );
}
