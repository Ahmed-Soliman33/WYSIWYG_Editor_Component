import { useState, useCallback } from "react";
import { EditorState } from "draft-js";
import RichEditor from "@components/editor/RichEditor";
import RichEditorDemo from "@components/editor/RichEditorDemo";
import ExternalToolbar from "@components/editor/ExternalToolbar";
import SwitchButton from "@/components/ui/SwitchButton";

const DemoPage = () => {
  const [controlledMode, setControlledMode] = useState(false);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  );

  const handleEditorChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  return (
    <div className="container mx-auto">
      <section className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold sm:text-3xl">
            React Editor Component
          </h1>
          <p className="text-primary max-w-[75%] text-[.8rem] sm:text-base">
            This page demonstrates the React Editor component. You can easily
            switch between controlled and uncontrolled modes using the toggle
            below.
          </p>
        </div>
        <div className="grid grid-cols-10">
          <div className="col-span-9 flex flex-col gap-1">
            <p className="text-primary/90 text-md font-bold">Controlled Mode</p>
            <span className="text-grayColor text-sm">
              Toggle to switch between controlled and uncontrolled modes
            </span>
          </div>
          <SwitchButton
            label="Controlled Mode"
            onChange={setControlledMode}
            checked={controlledMode}
          />
        </div>
      </section>

      <section id="demo-page" className="mt-8">
        <h2 className="flex items-center gap-1 text-[.9rem] font-bold sm:text-xl">
          <svg
            width="13"
            height="13"
            viewBox="0 0 380 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M350 190C350 278.366 278.366 350 190 350C101.634 350 30 278.366 30 190C30 101.634 101.634 30 190 30C278.366 30 350 101.634 350 190Z"
              fill="#2d2c2c"
            />
          </svg>
          Example {controlledMode ? "Controlled" : "Uncontrolled"} Mode
        </h2>
        <RichEditor
          placeholder={`${controlledMode ? "Controlled" : "Uncontrolled"} Mode...`}
          renderToolbar={ExternalToolbar}
          {...(controlledMode && {
            ...{
              value: editorState,
              onChange: handleEditorChange,
            },
          })}
          className="mb-4"
          style={{ maxWidth: "90%" }}
        />
      </section>
      <section>
        <h2 className="flex items-center gap-1 text-[.9rem] font-bold sm:text-xl">
          <svg
            width="13"
            height="13"
            viewBox="0 0 380 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M350 190C350 278.366 278.366 350 190 350C101.634 350 30 278.366 30 190C30 101.634 101.634 30 190 30C278.366 30 350 101.634 350 190Z"
              fill="#2d2c2c"
            />
          </svg>
          Fake Api Demo
        </h2>
        <RichEditorDemo />
      </section>
    </div>
  );
};

export default DemoPage;
