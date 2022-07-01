import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { toHaveStyle } from "@testing-library/jest-dom";
import { replaceCamelWithSpaces } from "./App";

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
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button"
  });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  //checkbox checked
  fireEvent.click(checkbox);
  //button should be disabled
  expect(colorButton).toBeDisabled();
  //uncheck
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray background, changes to red", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button"
  });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  //enable
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

test("clicked disabled button has gray background and revert to blue", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", {
    name: "Disable button"
  });
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  //change button to blue
  fireEvent.click(colorButton);

  //change to gray
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  //uncheck
  fireEvent.click(checkbox);

  //click button change to red
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });
});

describe("all the camelcase replace space test cases", () => {
  test("no inner capital", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("one inner capital", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("multiple inner capital", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
