import Alert from "react-bootstrap/Alert";

function AlertDismissibleExample({ show, setShow, message }) {
  if (show) {
    return (
      <div className="mt-3">
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading style={{ fontSize: "11px" }}>{message}</Alert.Heading>
        </Alert>
      </div>
    );
  }
  return;
}

export default AlertDismissibleExample;
