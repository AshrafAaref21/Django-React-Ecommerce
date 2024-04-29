import { useSelector } from "react-redux";
import {
  getCart,
  getPaymentMethod,
  getShippingAddress,
} from "../cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import OrderItemDetails from "./OrderItemDetails";
import OrderCostCart from "./OrderCostCart";

function PlaceOrder() {
  const shippingAddress = useSelector(getShippingAddress);
  const paymentMethod = useSelector(getPaymentMethod);
  const cart = useSelector(getCart);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!Object.keys(shippingAddress).length) navigate("/shipping");
    },
    [shippingAddress, navigate]
  );

  return (
    <div>
      <h1 className="d-flex justify-content-center align-items-center mt-2 mb-5">
        Your Order Details
      </h1>
      <div className="form-grid-system">
        <div className="cart-details">
          <div style={{ width: "90%" }}>
            <h4>Shipping</h4>
            <p>
              <span>Address : </span> {shippingAddress.address}
            </p>
            <hr />
          </div>

          <div style={{ width: "90%" }}>
            <h4>Payment</h4>
            <p>
              <span>Method : </span> {paymentMethod}
            </p>
            <hr />
          </div>

          {cart.map((item) => (
            <OrderItemDetails cart={item} key={item._id} />
          ))}
        </div>

        <div className="order-details">
          <OrderCostCart />
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
