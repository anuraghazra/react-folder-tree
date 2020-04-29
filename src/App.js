import React, { useState, useLayoutEffect } from "react";
import "./styles.css";

import Tree from "./Tree/Tree";

const structure = [
  {
    type: "folder",
    name: "client",
    files: [
      {
        type: "folder",
        name: "ui",
        files: [
          { type: "file", name: "Toggle.js" },
          { type: "file", name: "Button.js" },
          { type: "file", name: "Button.style.js" },
        ],
      },
      {
        type: "folder",
        name: "components",
        files: [
          { type: "file", name: "Tree.js" },
          { type: "file", name: "Tree.style.js" },
        ],
      },
      { type: "file", name: "setup.js" },
      { type: "file", name: "setupTests.js" },
    ],
  },
  {
    type: "folder",
    name: "packages",
    files: [
      {
        type: "file",
        name: "main.js",
      },
    ],
  },
  { type: "file", name: "index.js" },
];

export default function App() {
  let [data, setData] = useState(structure);

  const handleClick = (node) => {
    console.log(node);
  };
  const handleUpdate = (state) => {
    localStorage.setItem(
      "tree",
      JSON.stringify(state, function (key, value) {
        if (key === "parentNode" || key === "id") {
          return null;
        }
        return value;
      })
    );
  };

  useLayoutEffect(() => {
    try {
      let savedStructure = JSON.parse(localStorage.getItem("tree"));
      if (savedStructure) {
        setData(savedStructure);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="App">
      <h2>Imparative API (editable)</h2>

      <Tree data={data} onUpdate={handleUpdate} onNodeClick={handleClick} />

      <h2>Declarative API</h2>
      <Tree>
        <Tree.Folder name="client">
          <Tree.Folder name="Components">
            <Tree.File name="Button.jsx" />
            <Tree.File name="Button.style.js" />
          </Tree.Folder>
          <Tree.File name="setup.js" />
          <Tree.Folder name="client">
            <Tree.Folder name="Components">
              <Tree.File name="Button.jsx" />
              <Tree.File name="Button.style.js" />
            </Tree.Folder>
            <Tree.File name="setup.js" />
          </Tree.Folder>
        </Tree.Folder>
        <Tree.File name="index.html" />
        <Tree.File name="style.css" />
        <Tree.File name="style.css" />
        <Tree.File name="style.css" />
      </Tree>
    </div>
  );
}
