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

  it("should enable the confirm button on first click and disable on second click", async () => {
    render(<SummaryForm />);
    const termsEndConditionsElement = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const confirmButtonElement = screen.getByRole("button", {
      name: /confirm order/i,
    });

    await userEvent.click(termsEndConditionsElement);
    expect(confirmButtonElement).toBeEnabled();

    await userEvent.click(termsEndConditionsElement);
    expect(confirmButtonElement).toBeDisabled();
  });

  it("should popover respond to hover", async () => {
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );

    expect(popover).toBeInTheDocument();

    await userEvent.unhover(termsAndConditions);

    expect(popover).not.toBeInTheDocument();
  });
});
