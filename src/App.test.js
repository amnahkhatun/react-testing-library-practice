import { fireEvent, render, screen } from "@testing-library/react";
import { toHaveStyle } from "@testing-library/jest-dom";
import App from "./App";

test("button has correct initial color", () => {
  render(<App />);
  // find by role and initial text
  const colorButton = screen.getByRole("button", { name: "Change to blue" }); //screen is global and getByRole to check the button
  // test the background color
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  //click button
  fireEvent.click(colorButton);

  //change color to blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  //expect to change the text
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial render of checkbox", () => {
  render(<App />);
  //check button is enabled initially
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  expect(colorButton).toBeEnabled();

  //checkbox is unchecked initially
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("checkbox checked button disabled", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  //checkbox checked
  fireEvent.click(checkbox);
  //button should be disabled
  expect(button).toBeDisabled();

  //uncheck
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});
