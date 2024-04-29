import { useSelector } from "react-redux";
import { getCart } from "../cart/cartSlice";
import { ListGroup } from "react-bootstrap";
import CartItemDetails from "../cart/CartItemDetails";
import { Form } from "react-router-dom";

function FormOrder() {
  const cart = useSelector(getCart);
  return (
    <Form>
      <ListGroup variant="flush">
        {cart.map((el) => (
          <CartItemDetails cartItem={el} key={el._id} />
        ))}
      </ListGroup>
    </Form>
  );
}

export default FormOrder;
