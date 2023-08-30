import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import { OrderDetailsProvider } from "../../../contexts/OrderDetails";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops changed", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings changed", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderDetailsProvider });

  const toppingsTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });

  expect(toppingsTotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await userEvent.click(cherriesCheckbox);

  expect(toppingsTotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });

  await userEvent.click(hotFudgeCheckbox);

  expect(toppingsTotal).toHaveTextContent("3.00");

  await userEvent.click(hotFudgeCheckbox);

  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  it("grand total starts at $0.00", () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
  });
  it("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  it("grand total updates properly if toppings is added first", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  });
  it("grand total updates properly if item is removed ", async () => {
    render(<OrderEntry />, { wrapper: OrderDetailsProvider });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await userEvent.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "2");

    await userEvent.clear(vanillaInput);
    await userEvent.type(vanillaInput, "1");

    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("3.50");

    await userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
