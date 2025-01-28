import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { CustomInput } from "./CustomInput";

describe("CustomInput", () => {
  test("should render the input with correct props", () => {
    render(
      <CustomInput
        name={"title"}
        type={"text"}
        placeholder={"Titulo da Tarefa"}
        className="custom-class"
      />
    );
    const inputElement = screen.getByPlaceholderText("Titulo da Tarefa");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("name", "title");
    expect(inputElement).toHaveClass("custom-class");
  });

  test("should call onChange when input value changes", () => {
    const handleChange = vi.fn();
    render(
      <CustomInput
        name="title"
        type="text"
        placeholder="Titulo da Tarefa"
        onChange={handleChange}
      />
    );
    const inputElement = screen.getByPlaceholderText("Titulo da Tarefa");
    fireEvent.change(inputElement, { target: { value: "Nova Tarefa" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "Nova Tarefa",
        }),
      })
    );
  });

  test("should call onPressEnter when Enter key is pressed", () => {
    const handlePressEnter = vi.fn();
    render(
      <CustomInput
        name="title"
        type="text"
        placeholder="Titulo da Tarefa"
        onPressEnter={handlePressEnter}
      />
    );

    const inputElement = screen.getByPlaceholderText("Titulo da Tarefa");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(handlePressEnter).toHaveBeenCalledTimes(1);
  });

  test("should display error style when error is present", () => {
    render(
      <CustomInput
        name="title"
        type="text"
        placeholder="Titulo da Tarefa"
        error="Erro no campo"
      />
    );

    const inputElement = screen.getByPlaceholderText("Titulo da Tarefa");
    expect(inputElement).toHaveClass("border-red-500");
    expect(inputElement).toHaveClass("outline-red-500");
  });
});
