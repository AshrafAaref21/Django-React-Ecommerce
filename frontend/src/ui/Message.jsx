import { Alert } from "react-bootstrap";

function Message({ variant, children }) {
  return (
    <Alert style={{ width: "100%" }} variant={variant}>
      {children}
    </Alert>
  );
}

export default Message;
