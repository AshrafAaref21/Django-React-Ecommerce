function Footer() {
  return (
    <footer
      style={{
        padding: "10px",
        paddingRight: "30px",
        paddingLeft: "30px",
        position: "fixed",
        bottom: "0",
        left: "0",
        backgroundColor: "#55595c",
        width: "100%",
        zIndex: "999",
        color: "white",
      }}>
      <h3 style={{ color: "white" }}>ProShop Eco.</h3>

      <div className="d-flex justify-content-between">
        <div>
          <div className="my-1">BackEnd With: Django</div>
          <div className="my-1">FrontEnd With: React</div>
        </div>
        <div>
          <div className="my-1">Made by: Eng/ Ashraf Aaref</div>
          <div className="my-1">Full Stack Data Scientist</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
