import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "react-bootstrap";

function AppLayout() {
  return (
    <>
      <Header />
      <main className="py-3 d-flex flex-column app-overflow">
        <Container style={{ marginBottom: "100px" }}>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
