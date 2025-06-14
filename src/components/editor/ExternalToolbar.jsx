import StyleButton from "./StyleButton.jsx";

const INLINE_STYLE_BUTTONS = [
  { label: "B", style: "BOLD" },
  { label: "I", style: "ITALIC" },
  { label: "U", style: "UNDERLINE" },
];

const BLOCK_STYLE_BUTTONS = [
  { label: "Code Block", style: "code-block" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
];

const RenderToolbar = ({
  editorState,
  toggleInlineStyle,
  toggleBlockStyle,
}) => {
  // Get the current inline style
  const currentInlineStyle = editorState.getCurrentInlineStyle();

  // Get the current block Style
  const currentBlockStyle = editorState
    .getCurrentContent()
    .getBlockForKey(editorState.getSelection().getStartKey())
    .getType();

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      {INLINE_STYLE_BUTTONS.map((type) => (
        <StyleButton
          key={type.label}
          active={currentInlineStyle.has(type.style)}
          label={type.label}
          onToggle={toggleInlineStyle}
          style={type.style}
        />
      ))}
      {BLOCK_STYLE_BUTTONS.map((type) => (
        <StyleButton
          key={type.label}
          active={currentBlockStyle === type.style}
          label={type.label}
          onToggle={toggleBlockStyle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default RenderToolbar;
