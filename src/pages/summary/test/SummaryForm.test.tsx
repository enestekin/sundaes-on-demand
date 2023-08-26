import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SummaryForm from "../SummaryForm";

describe("SummaryForm Component", () => {
  it("should unchecked terms and conditions button by default", () => {
    render(<SummaryForm />);
    const termsEndConditionsElement = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButtonElement = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(termsEndConditionsElement).not.toBeChecked();
    expect(confirmButtonElement).toBeDisabled();
  });

  it("should enable the confirm button on first click and disable on second click", () => {
    render(<SummaryForm />);
    const termsEndConditionsElement = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButtonElement = screen.getByRole("button", {
      name: /confirm order/i,
    });

    userEvent.click(termsEndConditionsElement);
    expect(confirmButtonElement).toBeEnabled();

    userEvent.click(termsEndConditionsElement);
    expect(confirmButtonElement).toBeDisabled();
  });
});
