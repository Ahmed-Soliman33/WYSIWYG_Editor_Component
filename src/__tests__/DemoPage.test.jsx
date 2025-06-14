import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EditorState } from "draft-js";
import DemoPage from "../demo/DemoPage"; // Adjust path

// Mock dependencies
vi.mock("@components/editor/RichEditor", () => ({
  default: ({ placeholder, value, onChange }) => (
    <div
      data-testid="rich-editor"
      data-placeholder={placeholder}
      data-value={value}
    >
      <button onClick={() => onChange(EditorState.createEmpty())}>
        Change
      </button>
    </div>
  ),
}));

vi.mock("@components/editor/RichEditorDemo", () => ({
  default: () => <div data-testid="rich-editor-demo">Demo</div>,
}));

vi.mock("@components/editor/ExternalToolbar", () => ({
  default: () => <div data-testid="external-toolbar">Toolbar</div>,
}));

vi.mock("@/components/ui/SwitchButton", () => ({
  default: ({ checked, onChange }) => (
    <div data-testid="switch-button" data-checked={checked}>
      <button onClick={() => onChange(!checked)}>Toggle</button>
    </div>
  ),
}));

describe("DemoPage", () => {
  it("renders initial content and controlled mode toggle", () => {
    render(<DemoPage />);
    expect(screen.getByText("React Editor Component")).toBeInTheDocument();
    expect(screen.getByText("Controlled Mode")).toBeInTheDocument();
    expect(screen.getByTestId("switch-button")).toHaveAttribute(
      "data-checked",
      "false",
    );
    expect(screen.getByTestId("rich-editor")).toHaveAttribute(
      "data-placeholder",
      "Uncontrolled Mode...",
    );
  });

  it("toggles between controlled and uncontrolled mode", () => {
    render(<DemoPage />);
    const editor = screen.getByTestId("rich-editor");
    expect(editor).toHaveAttribute("data-placeholder", "Uncontrolled Mode...");

    fireEvent.click(
      screen.getByTestId("switch-button").querySelector("button"),
    );
    expect(editor).toHaveAttribute("data-placeholder", "Controlled Mode...");
    expect(editor).toHaveAttribute("data-value"); // Value prop is passed in controlled mode
  });

  it("renders RichEditorDemo section", () => {
    render(<DemoPage />);
    expect(screen.getByTestId("rich-editor-demo")).toBeInTheDocument();
  });
});
