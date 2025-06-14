import { useEffect, useState } from "react";
import { ContentState, EditorState } from "draft-js";

export function useEditorFakeApi(initialText = "", delay = 2000) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Fake change text function
  const changeText = function (text) {
    const content = ContentState.createFromText(text);
    const newState = EditorState.createWithContent(content);
    setEditorState(newState);
    setIsSaving(false);
  };

  // Fake load content
  const loadContent = () => {
    setIsLoading(true);
    setTimeout(() => {
      changeText(initialText);
      setIsLoading(false);
    }, delay);
  };

  // Fake save function
  const saveContent = () => {
    setIsSaving(true);
    const content = editorState.getCurrentContent();
    const plainText = content.getPlainText();

    setTimeout(() => {
      console.log("✅ Saved:", plainText);
      changeText("");
    }, 1500);
  };

  return {
    editorState,
    setEditorState,
    isLoading,
    isSaving,
    loadContent,
    saveContent,
  };
}
