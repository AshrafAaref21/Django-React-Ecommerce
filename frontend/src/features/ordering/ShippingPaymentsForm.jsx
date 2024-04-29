import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateShippingAddress } from "../cart/cartSlice";

function ShippingPaymentsForm() {
  const shippingFromLocalStorage = localStorage.getItem("shipping")
    ? JSON.parse(localStorage.getItem("shipping"))
    : {
        address: "",
        city: "",
        country: "",
        postalCode: "",
      };
  const [address, setAddress] = useState(shippingFromLocalStorage.address);
  const [city, setCity] = useState(shippingFromLocalStorage.city);
  const [country, setCountry] = useState(shippingFromLocalStorage.country);
  const [postalCode, setPostalCode] = useState(
    shippingFromLocalStorage.postalCode
  );
  const [payment, setPayment] = useState("PayPal");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    if (!address || !city || !country || !postalCode) return;
    const shippingAddress = { address, city, country, postalCode };
    console.log(shippingAddress);
    dispatch(updateShippingAddress(shippingAddress, payment));
    navigate("/placeorder");
  }

  return (
    <div className="mt-4">
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleClick();
        }}>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="address">Address</Form.Label>
          <div className="position-relative">
            <Form.Control
              name="address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Button
              variant="outline-secondary"
              // size="sm"
              className="position-absolute top-0 end-0 d-flex mt-1"
              style={{ height: "80%", alignItems: "center" }}>
              get Location
            </Button>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="country">Country</Form.Label>
          <Form.Control
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="city">City</Form.Label>
          <Form.Control
            name="city"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="postalCode">Postal Code</Form.Label>
          <Form.Control
            id="postalCode"
            name="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="payment">Payment Method</Form.Label>
          <Form.Select
            name="payment"
            id="payment"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}>
            <option value="PayPal">PayPal</option>
            <option value="x">x..</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="dark"
          type="submit"
          //   onClick={handleClick}
          style={{
            width: "50%",
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}>
          Check Your Order Details
        </Button>
      </Form>
    </div>
  );
}

export default ShippingPaymentsForm;
