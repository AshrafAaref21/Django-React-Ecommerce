import { Button, Col, Image, ListGroup, Modal, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteItem, updateItemQuantity } from "./cartSlice";

function CartItemDetails({ cartItem }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(0);
  const [show, setShow] = useState(false);
  function onIncreaseItem() {
    setQuantity((qty) => qty + 1);
    dispatch(updateItemQuantity(cartItem._id, cartItem.qty + 1));
  }

  function onDecreaseItem() {
    setQuantity((qty) => qty - 1);

    dispatch(updateItemQuantity(cartItem._id, cartItem.qty - 1));
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOnDelete = () => {
    dispatch(deleteItem(cartItem._id));
    setShow(true);
  };
  return (
    <ListGroup.Item key={cartItem._id} className="mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <Row>
          <Col md={2}>
            <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
          </Col>

          <Col md={3}>
            <Link
              to={`/product/${cartItem._id}`}
              style={{ textDecoration: "none" }}>
              {cartItem.name}
            </Link>
          </Col>

          <Col md={2}>$ {cartItem.price}</Col>

          <Col md={2}>
            <div className="d-flex justify-content-between align-items-center">
              <Button
                onClick={onIncreaseItem}
                className="btn-block"
                type="button"
                disabled={cartItem.qty >= cartItem.countInStock}>
                +
              </Button>

              {/* <Col md={1}> */}
              <span
                className="d-flex font-weight-bold"
                style={
                  {
                    // fontSize: "14px",
                    // marginLeft: "40%",
                  }
                }>
                {cartItem.qty}
              </span>
              {/* </Col> */}

              <Button
                onClick={onDecreaseItem}
                className="btn-block"
                type="button"
                disabled={cartItem.qty + quantity <= 1}>
                -
              </Button>
            </div>
          </Col>

          <Col md={1} className="mx-3">
            <Button variant="primary" onClick={handleShow}>
              <i className="fas fa-trash"></i>
            </Button>

            <Modal
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={show}
              onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Deleting Item</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Do you want to delete {cartItem.name} from your cart ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleOnDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </div>
    </ListGroup.Item>
  );
}

export default CartItemDetails;

CartItemDetails.propTypes = {
  cartItem: PropTypes.object,
};
