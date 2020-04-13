# React Folder Tree Component

Simple yet flexible folder tree component with Imparative and Declarative API with build-in folder editing capabilities.

[Live Demo](https://schsn.csb.app/)

## Imparative API

Imparative API can be editable. :D

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
