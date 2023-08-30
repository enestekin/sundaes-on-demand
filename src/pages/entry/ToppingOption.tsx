import { Col, Form } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

interface ToppingOptionProps {
  name: string;
  imagePath: string;
}

const ToppingOption: React.FC<ToppingOptionProps> = ({ name, imagePath }) => {
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, e.target.checked ? 1 : 0, "toppings");
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
      <Form.Group controlId={`${name}-topping-checkbox`}>
        <Form.Check type="checkbox" label={name} onChange={handleChange} />
      </Form.Group>
    </Col>
  );
};

export default ToppingOption;
