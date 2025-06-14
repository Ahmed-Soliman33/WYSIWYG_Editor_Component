import StyleButton from "./StyleButton";

const STYLE_BUTTONS = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
];

const DefaultToolbar = ({ editorState, onToggle }) => (
  <div className="flex gap-2 mb-2">
    {STYLE_BUTTONS.map((type) => (
      <StyleButton
        key={type.label}
        active={editorState.getCurrentInlineStyle().has(type.style)}
        label={type.label}
        onToggle={onToggle}
        style={type.style}
      />
    ))}
  </div>
);

export default DefaultToolbar;
