import { useSelector } from "react-redux";
import ShippingPaymentsForm from "../features/ordering/ShippingPaymentsForm";
import { selectCurrentUser } from "../features/user/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ShippingPage() {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!Object.keys(currentUser).length) navigate("/login");
    },
    [currentUser, navigate]
  );
  return <ShippingPaymentsForm />;
}

export default ShippingPage;
