import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import PropTypes from "prop-types";
import DefaultToolbar from "./DefaultToolbar";
import { useRichEditor } from "@/hooks/useRichEditor";

const RichEditor = forwardRef(
  (
    {
      value,
      onChange,
      placeholder = "Write something...",
      renderToolbar: RenderToolbar,
      className = "",
      style,
      spellCheck = false,
    },
    ref,
  ) => {
    // Initialize rich editor
    const {
      editorState,
      onChangeHandler,
      handleKeyCommand,
      toggleInlineStyle,
      toggleBlockStyle,
    } = useRichEditor({ value, onChange });

    const editorRef = useRef(null);

    // Focus editor
    const focusEditor = useCallback(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, []);
    focusEditor();

    // To expose the focusEditor to handle if ref is passed from outside
    useImperativeHandle(ref, () => ({
      focus: focusEditor,
      blur: () => {
        editorRef.current.blur();
      },
    }));

    // Dynamic editor class for placeholder
    let editorClassName = `border border-gray-300 rounded-md p-2 min-h-[200px] ${className}`;
    const contentState = editorState.getCurrentContent();
    if (
      !contentState.hasText() &&
      contentState.getBlockMap().first().getType() !== "unstyled"
    ) {
      editorClassName += " placeholder-hidden";
    }

    // Toolbar props
    const toolbarProps = {
      editorState,
      toggleInlineStyle,
      toggleBlockStyle,
    };

    return (
      <div
        data-testid="rich-editor"
        className="mx-auto w-full p-4"
        style={style}
      >
        {/* Render (external toolbar or default toolbar) */}
        {RenderToolbar ? (
          <RenderToolbar {...toolbarProps} />
        ) : (
          <DefaultToolbar {...toolbarProps} />
        )}

        <div
          className={editorClassName}
          onClick={focusEditor}
          data-testid="editor-container"
        >
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChangeHandler}
            placeholder={placeholder}
            ref={editorRef}
            spellCheck={spellCheck}
          />
        </div>
      </div>
    );
  },
);

RichEditor.propTypes = {
  value: PropTypes.instanceOf(EditorState),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  renderToolbar: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default RichEditor;
