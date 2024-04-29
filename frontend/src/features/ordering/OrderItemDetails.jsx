import PropTypes from "prop-types";
import "./order.css";

function OrderItemDetails({ cart }) {
  // console.log(cart);
  return (
    <div className="d-flex gap-2 align-items-center mb-3 order-cart-container ">
      <img src={cart.image} alt={cart.name} className="cart-img" />
      <div style={{ width: "300px" }}>{cart.name}</div>
      <div style={{ width: "300px", marginLeft: "auto" }}>
        Total Price = {cart.qty} unit x {cart.price} =
        <strong className="d-flex justify-content-center align-items-center">
          $ {Number(cart.price)}
        </strong>
      </div>
    </div>
  );
}

export default OrderItemDetails;

OrderItemDetails.propTypes = {
  cart: PropTypes.object,
};
