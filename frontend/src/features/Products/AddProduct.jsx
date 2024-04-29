import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addItem,
  getCart,
  getCurrentQuantityById,
  updateItemQuantity,
} from "../cart/cartSlice";

function AddProduct({ product }) {
  const [qty, setQty] = useState(1);
  const [addQty, setAddQty] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(getCart) || [];
  const isInCart = Boolean(
    cart.find((item) => item?._id === product?._id)?._id
  );
  const currentQty = useSelector(getCurrentQuantityById(product._id));
  console.log(currentQty);

  console.log(product);
  function addTocartHandler() {
    navigate(`/cart/${product._id}?qty=${qty}`);
    dispatch(addItem({ ...product, qty: Number(qty) }));
  }

  function onIncreaseItem() {
    setAddQty((qty) => qty + 1);
  }

  function onDecreaseItem() {
    setAddQty((qty) => qty - 1);
  }

  function updatecartHandler() {
    navigate(`/cart/${product._id}?qty=${currentQty + addQty}`);
    dispatch(updateItemQuantity(product._id, currentQty + addQty));
  }

  return (
    <>
      {product.countInStock > 0 &&
        (!isInCart ? (
          <ListGroup.Item>
            <Row>
              <Col>Qty: </Col>
              <Col xs="auto" className="my-1">
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option value={x + 1} key={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        ) : (
          <ListGroup.Item>
            <Row>
              <Col>Quantity</Col>
              <Col>{currentQty + addQty}</Col>
            </Row>
          </ListGroup.Item>
        ))}

      <ListGroup.Item>
        <Row>
          {!isInCart ? (
            <Button
              onClick={addTocartHandler}
              className="btn-block"
              type="button"
              disabled={product.countInStock <= 0}>
              Add To Cart
            </Button>
          ) : (
            <div className="d-flex justify-content-between">
              <Button
                onClick={onIncreaseItem}
                className="btn-block"
                type="button"
                disabled={currentQty + addQty >= product.countInStock}>
                +
              </Button>

              <Button
                onClick={onDecreaseItem}
                className="btn-block"
                type="button"
                disabled={currentQty + addQty <= 1}>
                -
              </Button>
            </div>
          )}
        </Row>
      </ListGroup.Item>

      {isInCart && (
        <ListGroup.Item>
          <Row>
            <Button
              onClick={updatecartHandler}
              className="btn-block"
              type="button"
              disabled={currentQty + addQty === currentQty}>
              Update Cart
            </Button>
          </Row>
        </ListGroup.Item>
      )}
    </>
  );
}

export default AddProduct;

AddProduct.propTypes = {
  product: PropTypes.object,
};
