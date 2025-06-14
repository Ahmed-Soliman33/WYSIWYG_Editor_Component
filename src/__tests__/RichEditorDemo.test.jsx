import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RichEditorDemo from "../components/editor/RichEditorDemo"; // Adjust path
import { useEditorFakeApi } from "@/hooks/useEditorFakeApi";

// Mock dependencies
vi.mock("../hooks/useEditorFakeApi", () => ({
  useEditorFakeApi: vi.fn().mockReturnValue({
    editorState: "Fake initial text",
    setEditorState: vi.fn(),
    isLoading: false,
    isSaving: false,
    loadContent: vi.fn(),
    saveContent: vi.fn(),
  }),
}));

vi.mock("../components/ui/Spinner", () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

vi.mock("../components/editor/RichEditor", () => ({
  default: ({ value, onChange, spellCheck }) => (
    <div
      data-testid="rich-editor"
      data-value={value}
      data-spellcheck={spellCheck}
    >
      RichEditor
    </div>
  ),
}));

vi.mock("../ui/Button", () => ({
  default: ({ children, onClick, disabled }) => (
    <button
      data-testid={children.toLowerCase()}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  ),
}));

vi.mock("../ui/SwitchButton", () => ({
  default: ({ checked, onChange }) => (
    <div data-testid="switch-button" data-checked={checked}>
      <button onClick={() => onChange(!checked)}>Toggle</button>
    </div>
  ),
}));

describe("RichEditorDemo", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when isLoading is true", () => {
    vi.mocked(useEditorFakeApi).mockReturnValue({
      editorState: "",
      setEditorState: vi.fn(),
      isLoading: true,
      isSaving: false,
      loadContent: vi.fn(),
      saveContent: vi.fn(),
    });

    render(<RichEditorDemo />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
    expect(screen.queryByTestId("rich-editor")).not.toBeInTheDocument();
  });

  it("calls saveContent on Save button click", () => {
    const saveContent = vi.fn();
    vi.mocked(useEditorFakeApi).mockReturnValue({
      editorState: "Fake initial text",
      setEditorState: vi.fn(),
      isLoading: false,
      isSaving: false,
      loadContent: vi.fn(),
      saveContent,
    });

    render(<RichEditorDemo />);
    fireEvent.click(screen.getByTestId("save"));
    expect(saveContent).toHaveBeenCalledTimes(1);
  });

  it("calls loadContent on Load Content button click", () => {
    const loadContent = vi.fn();
    vi.mocked(useEditorFakeApi).mockReturnValue({
      editorState: "Fake initial text",
      setEditorState: vi.fn(),
      isLoading: false,
      isSaving: false,
      loadContent,
      saveContent: vi.fn(),
    });

    render(<RichEditorDemo />);
    fireEvent.click(screen.getByTestId("load content"));
    expect(loadContent).toHaveBeenCalledTimes(1);
  });
});
