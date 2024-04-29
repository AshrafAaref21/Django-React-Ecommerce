// import { useParams, useSearchParams } from "react-router-dom";
//   const { id } = useParams();
//   console.log("parms: ", id);
//   const [searchParams, setSearchParams] = useSearchParams();
//   const qty = searchParams.get("qty");
//   console.log("searchparams: ", qty);

import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

import { getCart } from "../features/cart/cartSlice";
import CartItems from "../features/cart/CartItems";

function CartPage() {
  const cart = useSelector(getCart);
  //   console.log(cart);
  return (
    <Row className="mt-3">
      <CartItems cart={cart} />
    </Row>
  );
}

export default CartPage;
