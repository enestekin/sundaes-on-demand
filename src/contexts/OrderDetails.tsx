import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

interface OptionCounts {
  scoops: Record<string, number>;
  toppings: Record<string, number>;
}

interface OrderDetailsContextValue {
  optionCounts: {
    scoops: Record<string, number>;
    toppings: Record<string, number>;
  };
  resetOrder: () => void;
  updateItemCount: (
    itemName: string,
    newItemCount: number,
    optionType: "scoops" | "toppings"
  ) => void;
  totals: Record<string, number>;
}

const initialValues: OrderDetailsContextValue = {
  totals: { scoops: 0, toppings: 0 },
  optionCounts: { scoops: {}, toppings: {} },
  resetOrder: () => {},
  updateItemCount: () => {},
};

const OrderDetails = createContext<OrderDetailsContextValue>(initialValues);

export function useOrderDetails() {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be used within an OrderDetailsProvider"
    );
  }

  return contextValue;
}

interface OrderDetailsProviderProps {
  children: React.ReactNode;
}

export function OrderDetailsProvider(props: OrderDetailsProviderProps) {
  const [optionCounts, setOptionCounts] = useState<OptionCounts>({
    scoops: {},
    toppings: {},
  });

  function updateItemCount(
    itemName: string,
    newItemCount: number,
    optionType: "scoops" | "toppings"
  ) {
    const newOptionCounts = { ...optionCounts };

    newOptionCounts[optionType][itemName] = newItemCount;

    setOptionCounts(newOptionCounts);
  }

  function resetOrder() {
    setOptionCounts({ scoops: {}, toppings: {} });
  }

  function calculateTotal(optionType: "scoops" | "toppings") {
    const countsArray = Object.values(optionCounts[optionType]);

    const totalCount = countsArray.reduce((total, value) => total + value, 0);

    return totalCount * pricePerItem[optionType];
  }

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionCounts, updateItemCount, resetOrder, totals };
  return <OrderDetails.Provider value={value} {...props} />;
}
