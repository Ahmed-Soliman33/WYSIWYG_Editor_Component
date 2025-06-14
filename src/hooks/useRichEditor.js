import { EditorState, RichUtils } from "draft-js";
import { useCallback, useState } from "react";

export function useRichEditor({ value, onChange }) {
  // Determine if controlled or uncontrolled mode
  const isControlled = value !== undefined && onChange !== undefined;

  const [internalEditorState, setInternalEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const editorState = isControlled ? value : internalEditorState;
  const setEditorState = isControlled ? onChange : setInternalEditorState;

  // Handle editor state changes
  const onChangeHandler = useCallback(
    (newEditorState) => {
      setEditorState(newEditorState);
    },
    [setEditorState],
  );

  // Handle key commands (e.g., bold, italic)
  const handleKeyCommand = useCallback(
    (command, state) => {
      const newState = RichUtils.handleKeyCommand(state, command);
      if (newState) {
        onChangeHandler(newState);
        return "handled";
      }
      return "not-handled";
    },
    [onChangeHandler],
  );

  // Toggle inline style
  const toggleInlineStyle = useCallback(
    (inlineStyle) => {
      onChangeHandler(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    },
    [editorState, onChangeHandler],
  );

  const toggleBlockType = useCallback(
    (blockType) => {
      onChangeHandler(RichUtils.toggleBlockType(editorState, blockType));
    },
    [editorState, onChangeHandler],
  );

  return {
    editorState,
    onChangeHandler,
    handleKeyCommand,
    toggleInlineStyle,
    toggleBlockType,
  };
}
