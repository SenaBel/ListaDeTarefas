import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Button from "./Button";

describe("Button", () => {
  test("should render the button with correct props", () => {
    const { getByText, getByRole } = render(
      <Button
        className="bg-blue-500 hover:bg-blue-700 
                text-white font-bold py-2 px-4 rounded"
      >
        Filho
      </Button>
    );
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByText("Filho")).toBeInTheDocument();
  });
});
