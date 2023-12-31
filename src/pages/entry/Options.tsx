import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import ToppingOption from "./ToppingOption";
import { Row } from "react-bootstrap";
import AlertBanner from "../common/AlertBanner";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utils";
import { useOrderDetails } from "../../contexts/OrderDetails";

interface OptionsProps {
  optionType: string;
}

interface Item {
  name: string;
  imagePath: string;
}

const Options: React.FC<OptionsProps> = ({ optionType }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        setError(true);
      });
  }, []);

  if (error) {
    <AlertBanner variant="" message="" />;
  }

  const ItemComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const title =
    optionType[0].toUpperCase() + optionType.slice(1).toLocaleLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
