import Col from "react-bootstrap/Col";

interface ToppingOptionProps {
  name: string;
  imagePath: string;
}

const ToppingOption: React.FC<ToppingOptionProps> = ({ name, imagePath }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} topping`}
      />
    </Col>
  );
};

export default ToppingOption;
