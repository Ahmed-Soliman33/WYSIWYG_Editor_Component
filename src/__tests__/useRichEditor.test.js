import { renderHook, act } from "@testing-library/react";
import { EditorState, RichUtils, ContentState } from "draft-js";
import { useRichEditor } from "../hooks/useRichEditor"; // Adjust path

describe("useRichEditor", () => {
  // Helper function to get initial state
  const createInitialState = (text = "Initial text") =>
    EditorState.createWithContent(ContentState.createFromText(text));

  // Test 1: Initializes with empty state in uncontrolled mode
  it("initializes with empty state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useRichEditor({ value: undefined, onChange: undefined }),
    );

    expect(
      result.current.editorState.getCurrentContent().getPlainText() === "",
    ).toBe(true);
  });

  // Test 2: Initializes with provided value in controlled mode
  it("initializes with provided value when controlled", () => {
    const initialState = createInitialState();
    const mockOnChange = vi.fn();
    const { result } = renderHook(() =>
      useRichEditor({ value: initialState, onChange: mockOnChange }),
    );
    expect(result.current.editorState.getCurrentContent().getPlainText()).toBe(
      "Initial text",
    );
  });

  // Test 3: Updates state via onChangeHandler in uncontrolled mode
  it("updates state via onChangeHandler in uncontrolled mode", () => {
    const { result } = renderHook(() =>
      useRichEditor({ value: undefined, onChange: undefined }),
    );
    const newState = createInitialState("New text");

    act(() => {
      result.current.onChangeHandler(newState);
    });

    expect(result.current.editorState.getCurrentContent().getPlainText()).toBe(
      "New text",
    );
  });

  // Test 4: Updates state via onChange in controlled mode
  it("updates state via onChange in controlled mode", () => {
    const mockOnChange = vi.fn();
    const { result } = renderHook(() =>
      useRichEditor({ value: createInitialState(), onChange: mockOnChange }),
    );
    const newState = createInitialState("Updated text");

    act(() => {
      result.current.onChangeHandler(newState);
    });

    expect(mockOnChange).toHaveBeenCalledWith(newState);
    expect(result.current.editorState.getCurrentContent().getPlainText()).toBe(
      "Initial text",
    ); // لا يتغير داخليًا
  });

  // Test 5: Handles key command (e.g., bold)
  it("handles key command correctly", () => {
    const initialState = EditorState.createEmpty();
    const mockOnChange = vi.fn();
    const { result } = renderHook(() =>
      useRichEditor({ value: initialState, onChange: mockOnChange }),
    );

    const newState = RichUtils.handleKeyCommand(initialState, "bold");
    act(() => {
      result.current.handleKeyCommand("bold", initialState);
    });

    if (newState) {
      expect(mockOnChange).toHaveBeenCalledWith(newState);
      expect(result.current.handleKeyCommand("bold", initialState)).toBe(
        "handled",
      );
    } else {
      expect(result.current.handleKeyCommand("bold", initialState)).toBe(
        "not-handled",
      );
    }
  });

  // Test 6: Toggles inline style (e.g., BOLD)
  it("toggles inline style correctly", () => {
    const initialState = EditorState.createEmpty();
    const mockOnChange = vi.fn();
    const { result } = renderHook(() =>
      useRichEditor({ value: initialState, onChange: mockOnChange }),
    );

    act(() => {
      result.current.toggleInlineStyle("BOLD");
    });

    const newState = RichUtils.toggleInlineStyle(initialState, "BOLD");
    expect(mockOnChange).toHaveBeenCalledWith(newState);
  });

  // Test 7: Toggles block type correctly
  it("toggles block type correctly", () => {
    const initialState = EditorState.createEmpty();
    const mockOnChange = vi.fn();
    const { result } = renderHook(() =>
      useRichEditor({ value: initialState, onChange: mockOnChange }),
    );

    act(() => {
      result.current.toggleBlockStyle("header-one");
    });

    const newState = RichUtils.toggleBlockType(initialState, "header-one");
    expect(mockOnChange).toHaveBeenCalledWith(newState);
  });
});
