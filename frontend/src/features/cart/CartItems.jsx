import PropTypes from "prop-types";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Message from "../../ui/Message";
import CartItemDetails from "./CartItemDetails";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../user/userSlice";

function CartItems({ cart }) {
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);

  // console.log(shippingAddress);
  // console.log(currentUser);
  function handleCheckOut() {
    if (currentUser.email) {
      navigate("/shipping");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cart.length < 1 ? (
          <div className="d-flex my-3">
            <Message variant={"info"}>
              Your Cart is empty
              <Link className="mx-2" to="/">
                Go back
              </Link>
            </Message>
          </div>
        ) : (
          <ListGroup variant="flush">
            {cart.map((el) => (
              <CartItemDetails cartItem={el} key={el._id} />
            ))}
          </ListGroup>
        )}
      </Col>
      {cart.length > 0 && (
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  SubTotal ({cart.reduce((acc, item) => acc + item.qty, 0)})
                  Items
                </h2>
                $
                {cart
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Button
                    type="button"
                    className="btn-block"
                    onClick={handleCheckOut}>
                    Proceed to Checkout
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      )}
    </>
  );
}

export default CartItems;

CartItems.propTypes = {
  cart: PropTypes.array,
};
