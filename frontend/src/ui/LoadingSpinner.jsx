import Spinner from "react-bootstrap/Spinner";
function LoadingSpinner() {
  return (
    <>
      <Spinner
        animation="border"
        variant="secondary"
        style={{ height: "30%", width: "30%", margin: "35% 35%" }}
      />
    </>
  );
}

export default LoadingSpinner;
