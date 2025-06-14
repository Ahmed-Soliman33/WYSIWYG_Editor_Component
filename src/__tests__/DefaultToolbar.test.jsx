import { render, screen, fireEvent } from "@testing-library/react";
import { EditorState, ContentState, RichUtils } from "draft-js";
import DefaultToolbar from "../components/editor/DefaultToolbar"; // Adjust path
import { vi } from "vitest";
import userEvent from "@testing-library/user-event"; // Add user-event

describe("DefaultToolbar", () => {
  let mockToggleInlineStyle;
  let mockEditorState;

  beforeEach(() => {
    mockToggleInlineStyle = vi.fn();
    mockEditorState = EditorState.createEmpty(); // Initial state without styles
  });

  // Test 1: Renders Bold, Italic, and Underline buttons
  it("renders Bold, Italic, and Underline buttons", () => {
    render(
      <DefaultToolbar
        editorState={mockEditorState}
        toggleInlineStyle={mockToggleInlineStyle}
      />,
    );

    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Italic")).toBeInTheDocument();
    expect(screen.getByText("Underline")).toBeInTheDocument();
  });

  // Test 2: Buttons are not active by default
  it("buttons are not active by default", () => {
    render(
      <DefaultToolbar
        editorState={mockEditorState}
        toggleInlineStyle={mockToggleInlineStyle}
      />,
    );

    const boldButton = screen.getByText("Bold");
    const italicButton = screen.getByText("Italic");
    const underlineButton = screen.getByText("Underline");

    expect(boldButton).toHaveClass("bg-gray-100");
    expect(italicButton).toHaveClass("bg-gray-100");
    expect(underlineButton).toHaveClass("bg-gray-100");
    expect(boldButton).not.toHaveClass("bg-blue-500");
    expect(italicButton).not.toHaveClass("bg-blue-500");
    expect(underlineButton).not.toHaveClass("bg-blue-500");
  });

  // Test 3: Toggles Bold style when clicked
  it("toggles Bold style when clicked", async () => {
    render(
      <DefaultToolbar
        editorState={mockEditorState}
        toggleInlineStyle={mockToggleInlineStyle}
      />,
    );

    const boldButton = screen.getByText("Bold");
    await userEvent.click(boldButton); // Use userEvent for realistic interaction

    expect(mockToggleInlineStyle).toHaveBeenCalledWith("BOLD");
    expect(mockToggleInlineStyle).toHaveBeenCalledTimes(1);
  });

  // Test 4: Toggles Italic style when clicked
  it("toggles Italic style when clicked", async () => {
    render(
      <DefaultToolbar
        editorState={mockEditorState}
        toggleInlineStyle={mockToggleInlineStyle}
      />,
    );

    const italicButton = screen.getByText("Italic");
    await userEvent.click(italicButton);

    expect(mockToggleInlineStyle).toHaveBeenCalledWith("ITALIC");
    expect(mockToggleInlineStyle).toHaveBeenCalledTimes(1);
  });

  // Test 5: Toggles Underline style when clicked
  it("toggles Underline style when clicked", async () => {
    render(
      <DefaultToolbar
        editorState={mockEditorState}
        toggleInlineStyle={mockToggleInlineStyle}
      />,
    );

    const underlineButton = screen.getByText("Underline");
    await userEvent.click(underlineButton);

    expect(mockToggleInlineStyle).toHaveBeenCalledWith("UNDERLINE");
    expect(mockToggleInlineStyle).toHaveBeenCalledTimes(1);
  });

  // Test 6: Activates button when style is present
  it("activates button when style is present", () => {
    // Create editorState with BOLD style
    const contentState = ContentState.createFromText("Bold text");
    const editorStateWithBold = EditorState.createWithContent(contentState);
    const editorStateWithBoldStyle = RichUtils.toggleInlineStyle(
      editorStateWithBold,
      "BOLD",
    );

    render(
      <DefaultToolbar
        editorState={editorStateWithBoldStyle}
        toggleInlineStyle={mockToggleInlineStyle}
      />,
    );

    const boldButton = screen.getByText("Bold");
    const italicButton = screen.getByText("Italic");
    const underlineButton = screen.getByText("Underline");

    expect(boldButton).toHaveClass("bg-blue-500");
    expect(italicButton).toHaveClass("bg-gray-100");
    expect(underlineButton).toHaveClass("bg-gray-100");
  });
});
