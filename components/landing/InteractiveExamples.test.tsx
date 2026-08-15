import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { InteractiveExamples } from "./InteractiveExamples";
import { HOMEPAGE_DRAFT_KEY } from "@/lib/draftTransfer";

const { push, track } = vi.hoisted(() => ({
  push: vi.fn(),
  track: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

vi.mock("@/lib/analytics", () => ({ track }));

describe("InteractiveExamples", () => {
  beforeEach(() => {
    push.mockReset();
    track.mockReset();
    sessionStorage.clear();
  });

  it("switches between saved example reviews", () => {
    render(<InteractiveExamples />);

    fireEvent.click(screen.getByRole("button", { name: /dickinson/i }));

    expect(
      screen.getByRole("heading", { name: /hope.*thing with feathers/i }),
    ).toBeInTheDocument();
    expect(track).toHaveBeenCalledWith({
      name: "example_selected",
      example: "hope-is-the-thing-with-feathers",
    });
  });

  it("offers five public-domain examples", () => {
    render(<InteractiveExamples />);

    expect(screen.getByText(/public-domain excerpts/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /larsen/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tagore/i })).toBeInTheDocument();
  });

  it("shows complete poems", () => {
    render(<InteractiveExamples />);

    fireEvent.click(screen.getByRole("button", { name: /tagore/i }));

    expect(screen.getByText("The complete poem")).toBeInTheDocument();
    expect(screen.getByText(/let my country awake/i)).toBeInTheDocument();
  });

  it("carries the selected writing into the review workspace", () => {
    render(<InteractiveExamples />);

    fireEvent.click(screen.getByRole("button", { name: /hemingway/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /try this writing yourself/i }),
    );

    const savedDraft = JSON.parse(
      sessionStorage.getItem(HOMEPAGE_DRAFT_KEY) ?? "{}",
    );
    expect(savedDraft.pastedText).toContain("white elephants");
    expect(push).toHaveBeenCalledWith("/review");
  });
});
