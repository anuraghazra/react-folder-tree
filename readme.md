# React Folder Tree Component

Simple yet flexible folder tree component with Imperative and Declarative API with build-in folder editing capabilities.

[Live Demo](https://ck6c8.csb.app/)

## Imperative API

Imperative API can be editable. :D

```jsx
<Tree
  data={[
    {
      type: "folder",
      name: "client",
      files: [
        {
          type: "folder",
          name: "Components",
          files: [
            { type: "file", name: "Button.jsx" },
            { type: "file", name: "Button.style.js" }
          ]
        },
        { type: "file", name: "setup.js" }
      ]
    },
    { type: "file", name: "index.html" },
    { type: "file", name: "style.css" }
  ]}
/>
```

## Declarative API

```jsx
<Tree>
  <Tree.Folder name="client">
    <Tree.Folder name="Components">
      <Tree.File name="Button.jsx" />
      <Tree.File name="Button.style.js" />
    </Tree.Folder>
    <Tree.File name="setup.js" />
  </Tree.Folder>
  <Tree.File name="index.html" />
  <Tree.File name="style.css" />
</Tree>
```

Made with <3 and React;
