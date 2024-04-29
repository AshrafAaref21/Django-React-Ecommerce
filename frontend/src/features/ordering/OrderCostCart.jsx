import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { Form } from "react-router-dom";

import {
  getCart,
  getPaymentMethod,
  getShippingAddress,
  getTotalCartPrice,
} from "../cart/cartSlice";
import { selectCurrentUser } from "../user/userSlice";

function OrderCostCart() {
  const totalCartCost = useSelector(getTotalCartPrice);
  const shippingCost = Number(totalCartCost) > 100 ? 0 : 10;
  const taxCost = Number(totalCartCost) * 0.082;
  const cart = useSelector(getCart);
  const orderItems = cart.map((item) => {
    return { product: item._id, qty: item.qty, price: item.price };
  });
  const shippingAddress = useSelector(getShippingAddress);
  const paymentMethod = useSelector(getPaymentMethod);

  const currentUser = useSelector(selectCurrentUser);

  return (
    <Form method="POST">
      <input hidden name="orderItems" value={JSON.stringify(orderItems)} />
      <input hidden name="paymentMethod" value={paymentMethod} />
      <input hidden name="userKey" value={currentUser.access} />
      <input
        hidden
        name="shippingAddress"
        value={JSON.stringify(shippingAddress)}
      />
      <h4 className="text-center">Order Cost</h4>
      <hr />
      <div className="order-summary-cost">
        <div className="d-flex justify-content-between">
          <span>Items</span>
          <span>$ {totalCartCost.toFixed(2)}</span>
        </div>

        <div className="d-flex justify-content-between">
          <span>Shipping</span>
          <span>$ {shippingCost}</span>
          <input hidden name="shippingPrice" value={shippingCost} />
        </div>

        <div className="d-flex justify-content-between">
          <span>Tax</span>
          <span>$ {taxCost.toFixed(2)}</span>
          <input hidden name="taxPrice" value={taxCost} />
        </div>
      </div>

      <hr />
      <div className="d-flex justify-content-between">
        <span>Total Cost</span>
        <span>$ {totalCartCost.toFixed(2)}</span>
        <input hidden name="totalPrice" value={totalCartCost} />
      </div>
      <hr />
      <Button
        type="submit"
        style={{
          width: "80%",
          display: "flex",
          //   alignItems: "center",
          justifyContent: "center",
          marginLeft: "10%",
          marginTop: "40px",
        }}>
        Place Order
      </Button>
    </Form>
  );
}

export default OrderCostCart;
