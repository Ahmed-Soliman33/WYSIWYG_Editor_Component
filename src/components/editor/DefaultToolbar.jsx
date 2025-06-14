import StyleButton from "./StyleButton";

const INLINE_STYLE_BUTTONS = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
];

const DefaultToolbar = ({ editorState, toggleInlineStyle }) => (
  <div className="mb-2 flex gap-2" data-testid="default-toolbar">
    {INLINE_STYLE_BUTTONS.map((type) => (
      <StyleButton
        key={type.label}
        active={editorState.getCurrentInlineStyle().has(type.style)}
        label={type.label}
        onToggle={toggleInlineStyle}
        style={type.style}
      />
    ))}
  </div>
);

export default DefaultToolbar;
