import { Alert } from "react-bootstrap";

interface AlertProps {
  variant: string;
  message: string;
}

const AlertBanner: React.FC<AlertProps> = ({ variant, message }) => {
  const alertMessage =
    message || "An unexpected error occured. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMessage}
    </Alert>
  );
};

export default AlertBanner;
