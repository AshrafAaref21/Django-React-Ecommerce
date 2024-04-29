import { useNavigate } from "react-router-dom";
import PlaceOrder from "../features/ordering/PlaceOrder";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/user/userSlice";
import { useEffect } from "react";

function PlaceOrderPage() {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!Object.keys(currentUser).length) navigate("/login");
    },
    [currentUser, navigate]
  );

  return <PlaceOrder />;
}

export default PlaceOrderPage;
