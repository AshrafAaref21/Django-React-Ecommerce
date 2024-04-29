import { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectAccessToken } from "../user/userSlice";

function CreateProduct() {
  const [show, setShow] = useState(false);
  const access = useSelector(selectAccessToken);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="dark" onClick={handleShow}>
        <i className="fas fa-plus me-2"></i>Create Product
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form method="POST">
          <input hidden name="id" value="create-form" />
          <input hidden name="key" value={access} />
          <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column m-3" style={{ gap: "10px" }}>
              <input
                name="name"
                placeholder="Product Name"
                className="p-3"
                required
              />
              <input
                name="description"
                placeholder="Product Description"
                className="p-3"
              />
              <input name="brand" placeholder="Product Brand" className="p-3" />
              <input
                name="category"
                placeholder="Product Category"
                className="p-3"
              />
              <input
                name="price"
                placeholder="Product Price"
                className="p-3"
                required
              />
              <input
                name="countInStock"
                placeholder="Product Stock"
                className="p-3"
                required
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default CreateProduct;
