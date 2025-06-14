# WYSIWYG Editor (React)

A reusable and flexible WYSIWYG editor built with `draft-js`.

## Features

- Supports both Controlled and Uncontrolled modes.
- Bold, Italic, Underline formatting.
- Custom toolbar support.
- Minimal default styling.
- Tested with jest & @testing-library/react.

## Usage

### Controlled

```jsx
<WysiwygEditor value={editorState} onChange={setEditorState} />
```

### Uncontrolled

```jsx
<WysiwygEditor />
```

### Custom Toolbar

```jsx
<WysiwygEditor
  value={editorState}
  onChange={setEditorState}
  renderToolbar={({ onToggle }) => (
    <div>
      <button onClick={() => onToggle("BOLD")}>Bold</button>
      <button onClick={() => onToggle("ITALIC")}>Italic</button>
    </div>
  )}
/>
```

### Installation

npm install
npm run dev

wysiwyg-editor/
├── public/
├── src/
│ ├── components/
│ │ └── WysiwygEditor.jsx
│ ├── demo/
│ │ └── Demo.jsx
│ ├── App.jsx
│ ├── main.jsx
│ ├── tests/
│ │ └── WysiwygEditor.test.jsx
├── .gitignore
├── README.md
├── package.json
└── vite.config.js
