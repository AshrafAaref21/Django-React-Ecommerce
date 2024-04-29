import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main className="my-5 text-center">
      <Container>
        <h1 className="my-4">This Page Does not Exist</h1>
        <Link to="/">Go To Home Page</Link>
      </Container>
    </main>
  );
}

export default ErrorPage;
