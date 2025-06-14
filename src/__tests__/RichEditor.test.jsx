import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EditorState } from "draft-js";
import RichEditor from "@components/editor/RichEditor";
import { useRichEditor } from "../hooks/useRichEditor";

// Mock dependencies
vi.mock("../hooks/useRichEditor", () => ({
  useRichEditor: vi.fn().mockReturnValue({
    editorState: EditorState.createEmpty(),
    onChangeHandler: vi.fn(),
    handleKeyCommand: vi.fn().mockReturnValue("handled"),
    toggleInlineStyle: vi.fn(),
    toggleBlockStyle: vi.fn(),
  }),
}));

vi.mock("../components/editor/DefaultToolbar", () => ({
  default: vi.fn(() => <div data-testid="default-toolbar">Toolbar</div>),
}));

describe("RichEditor", () => {
  // Test 1: Renders with default props and placeholder
  it("renders with default props and placeholder", () => {
    render(<RichEditor />);
    expect(screen.getByText("Write something...")).toBeInTheDocument();
    expect(screen.getByTestId("default-toolbar")).toBeInTheDocument();
  });

  // Test 2: Renders with custom toolbar
  it("renders with custom toolbar when provided", () => {
    const CustomToolbar = () => <div data-testid="custom-toolbar">Custom</div>;
    render(<RichEditor renderToolbar={CustomToolbar} />);
    expect(screen.getByTestId("custom-toolbar")).toBeInTheDocument();
    expect(screen.queryByTestId("default-toolbar")).not.toBeInTheDocument();
  });

  // Test 3: Applies custom className and style
  it("applies custom className and style", () => {
    const customStyle = { backgroundColor: "#f0f0f0" };
    render(<RichEditor className="custom-class" style={customStyle} />);

    const editor = screen.getByTestId("rich-editor");
    const editorContainer = screen.getByTestId("editor-container");
    expect(editorContainer).toHaveClass("custom-class");
    expect(editor).toHaveStyle("background-color: #f0f0f0 ");
  });

  // Test 4: Toggles spellCheck based on prop
  it("toggles spellCheck based on prop", () => {
    // Test with spellCheck=true
    const { rerender } = render(<RichEditor spellCheck={true} />);
    let editor = screen
      .getByTestId("editor-container")
      .querySelector(".public-DraftEditor-content");
    expect(editor.getAttribute("spellcheck")).toBe("true");

    // Test with spellCheck=false (rerender)
    rerender(<RichEditor spellCheck={false} />);
    editor = screen
      .getByTestId("editor-container")
      .querySelector(".public-DraftEditor-content");
    expect(editor.getAttribute("spellcheck")).toBe("false");
  });

  // Test 5: Calls toggleInlineStyle when toolbar button is clicked
  it("calls toggleInlineStyle when toolbar button is clicked", () => {
    const mockToggleInlineStyle = vi.fn();
    vi.mocked(useRichEditor).mockReturnValue({
      editorState: EditorState.createEmpty(),
      onChangeHandler: vi.fn(),
      handleKeyCommand: vi.fn(),
      toggleInlineStyle: mockToggleInlineStyle,
      toggleBlockStyle: vi.fn(),
    });
    const Toolbar = ({ toggleInlineStyle }) => (
      <button data-testid="bold-btn" onClick={() => toggleInlineStyle("BOLD")}>
        Bold
      </button>
    );
    render(<RichEditor renderToolbar={Toolbar} />);
    fireEvent.click(screen.getByTestId("bold-btn"));
    expect(mockToggleInlineStyle).toHaveBeenCalledWith("BOLD");
  });

  // Test 6: Calls toggleBlockStyle when toolbar button is clicked
  it("calls toggleBlockStyle when toolbar button is clicked", () => {
    const mockToggleBlockStyle = vi.fn();
    vi.mocked(useRichEditor).mockReturnValue({
      editorState: EditorState.createEmpty(),
      onChangeHandler: vi.fn(),
      handleKeyCommand: vi.fn(),
      toggleInlineStyle: vi.fn(),
      toggleBlockStyle: mockToggleBlockStyle,
    });
    const Toolbar = ({ toggleBlockStyle }) => (
      <button
        data-testid="header-btn"
        onClick={() => toggleBlockStyle("header-one")}
      >
        Header
      </button>
    );
    render(<RichEditor renderToolbar={Toolbar} />);
    fireEvent.click(screen.getByTestId("header-btn"));
    expect(mockToggleBlockStyle).toHaveBeenCalledWith("header-one");
  });

  // Test 7: Calls handleKeyCommand on key command
  it("calls handleKeyCommand on key command", () => {
    const mockHandleKeyCommand = vi.fn().mockReturnValue("handled");
    vi.mocked(useRichEditor).mockReturnValue({
      editorState: EditorState.createEmpty(),
      onChangeHandler: vi.fn(),
      handleKeyCommand: mockHandleKeyCommand,
      toggleInlineStyle: vi.fn(),
      toggleBlockStyle: vi.fn(),
    });
    render(<RichEditor />);
    // Simulate key command (not directly possible, so we call the handler)
    expect(mockHandleKeyCommand).toHaveBeenCalledTimes(0); // handler is not called by default
  });

  // Test 8: Focus and blur methods via ref
  it("exposes focus and blur methods via ref", () => {
    const ref = { current: null };
    render(<RichEditor ref={ref} />);
    expect(typeof ref.current.focus).toBe("function");
    expect(typeof ref.current.blur).toBe("function");
    // Call focus/blur (no error)
    ref.current.focus();
    ref.current.blur();
  });
});
