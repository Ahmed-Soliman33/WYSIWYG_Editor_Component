import { useEditorFakeApi } from "@hooks/useEditorFakeApi";
import Spinner from "@/components/ui/Spinner";
import RichEditor from "@/components/editor/RichEditor";
import Button from "../ui/Button";
import SwitchButton from "../ui/SwitchButton";
import { useState } from "react";

export default function RichEditorDemo() {
  const {
    editorState,
    setEditorState,
    isLoading,
    isSaving,
    loadContent,
    saveContent,
  } = useEditorFakeApi("Fake initial text", 1500);

  const [spellCheckEnabled, setSpellCheckEnabled] = useState(false);

  if (isLoading) return <Spinner />;

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between">
        <RichEditor
          value={editorState}
          onChange={setEditorState}
          className="mb-4"
          style={{ maxWidth: "90%" }}
          spellCheck={spellCheckEnabled}
        />
      </div>

      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex items-center">
          <span>Spell Check</span>
          <SwitchButton
            checked={spellCheckEnabled}
            onChange={setSpellCheckEnabled}
            className="ml-4"
            size="sm"
            data-testid="switch-button"
          />
        </div>
        <div className="flex gap-4 md:justify-end">
          <Button
            size="md"
            variant="primary"
            onClick={saveContent}
            className="mt-4 rounded-md"
            disabled={isSaving}
            data-testid="save"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={loadContent}
            className="mt-4 rounded-md"
            disabled={isSaving}
            data-testid="load content"
          >
            Load Content
          </Button>
        </div>
      </div>
    </div>
  );
}
