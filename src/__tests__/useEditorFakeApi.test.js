import { renderHook, act, waitFor } from "@testing-library/react";
import { EditorState, ContentState } from "draft-js";
import { useEditorFakeApi } from "../hooks/useEditorFakeApi"; // Adjust path
import { vi } from "vitest";

describe("useEditorFakeApi", () => {
  // Mock console.log to avoid polluting test output
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Test 1: Initializes with empty state
  it("initializes with empty state", () => {
    const { result } = renderHook(() => useEditorFakeApi());

    const content = result.current.editorState.getCurrentContent();

    expect(content.getPlainText() === "").toBe(true);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isSaving).toBe(false);
  });

  // Test 2: Loads content after delay
  it("loads content after delay", async () => {
    const initialText = "Loaded text";
    const { result } = renderHook(() => useEditorFakeApi(initialText, 100)); // Reduce delay for testing

    act(() => {
      result.current.loadContent();
    });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false), {
      timeout: 200,
    });
    await waitFor(
      () =>
        expect(
          result.current.editorState.getCurrentContent().getPlainText(),
        ).toBe(initialText),
      { timeout: 200 },
    );
  });

  // Test 3: Saves content after delay and clears it
  it("saves content after delay and clears it", async () => {
    const initialText = "Text to save";
    const { result } = renderHook(() => useEditorFakeApi(initialText, 100));

    // Set initial state manually for testing
    act(() => {
      const content = ContentState.createFromText(initialText);
      result.current.setEditorState(EditorState.createWithContent(content));
    });

    act(() => {
      result.current.saveContent();
    });

    expect(result.current.isSaving).toBe(true);
    await waitFor(() => expect(result.current.isSaving).toBe(false), {
      timeout: 2000,
    });
    await waitFor(
      () =>
        expect(
          result.current.editorState.getCurrentContent().getPlainText(),
        ).toBe(""),
      { timeout: 2000 },
    );
    expect(console.log).toHaveBeenCalledWith("Saved:", initialText);
  });

  // Test 4: Handles changeText function
  it("changes text via changeText function", () => {
    const { result } = renderHook(() => useEditorFakeApi());
    const newText = "Changed text";

    act(() => {
      result.current.changeText(newText);
    });

    expect(result.current.editorState.getCurrentContent().getPlainText()).toBe(
      newText,
    );
    expect(result.current.isSaving).toBe(false);
  });
});
