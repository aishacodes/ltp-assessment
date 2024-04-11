import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import LookupApp from "../LookupApp";

test("renders the component with initial state", () => {
  render(<LookupApp />);

  const titleElement = screen.getByText(/Quick lookup App/i);
  expect(titleElement).toBeInTheDocument();

  const generateButton = screen.getByText(
    /Generate Output/i
  ) as HTMLButtonElement;
  expect(generateButton.disabled).toBe(true);
});
