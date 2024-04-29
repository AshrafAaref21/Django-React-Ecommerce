import {
  useLoaderData,
  useNavigation,
  useParams,
  Link,
  Form,
} from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import { PayPalButton } from "react-paypal-button-v2";
import OrderItemDetails from "../features/ordering/OrderItemDetails";
import LoadingSpinner from "../ui/LoadingSpinner";
import { formatDate } from "../utils/helper";
import { selectCurrentUser } from "../features/user/userSlice";

function OrderPage() {
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = currentUser.isAdmin;
  console.log("isAdmin: ", isAdmin);
  const { orderId } = useParams();
  const order = useLoaderData();
  // console.log(order);
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  const [sdkReady, setSdkReady] = useState(false);
  const addPaypalScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AbR3GVFLjG7bTTcMgMcYhx_jZ7WgogHFm2gcsHLQs6qSWbMHTNK07A8XZIzniqSRTxvhH9q0CqXT7S7T";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  // console.log(sdkReady);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // console.log("currentUser.access :: ", currentUser.access);
  useEffect(
    function () {
      if (!order?.isPaid) {
        if (!window.paypal) {
          addPaypalScript();
          const script = document.body.querySelector("script[type]");
          return () => script.remove();
        } else {
          setSdkReady(true);
        }
      }
    },
    [order]
  );

  return (
    <>
      {typeof order === "string" || !order ? (
        <Alert variant="warning" className="my-4 p-3">
          <strong>You Cannot Access This Order</strong>
          <br />
          <Link to="/profile">Go To Your Profile</Link>
        </Alert>
      ) : (
        <>
          <h2 className="d-flex justify-content-center align-items-center mt-2 mb-5">
            Order #{orderId}
          </h2>
          <div>
            <div className="form-grid-system">
              <div className="cart-details">
                <div style={{ width: "90%" }}>
                  <h4>Shipping</h4>
                  <div className="d-flex gap-1 flex-column my-2">
                    <div>
                      <span>Name : </span> {order?.user.name}
                    </div>
                    <div>
                      <span>Email : </span>{" "}
                      <a href={`mailto:${order?.user.email}`}>
                        {order?.user.email}
                      </a>
                    </div>
                    <div>
                      <span>Address : </span> {order?.shippingAddress.address}
                    </div>
                  </div>
                  {order?.isDelivered ? (
                    <Alert variant="success">
                      Delivered on {formatDate(order?.deliveredAt)}
                    </Alert>
                  ) : (
                    <Alert
                      variant="warning"
                      className="d-flex justify-content-between align-items-center">
                      <p>Not Delivered Yet</p>
                      {isAdmin && (
                        <>
                          <Button onClick={handleShow} variant="info">
                            Deliver it
                          </Button>

                          <Modal show={show} onHide={handleClose}>
                            <Form method="PUT">
                              <input
                                hidden
                                name="access"
                                value={currentUser.access}
                              />
                              <Modal.Header closeButton>
                                <Modal.Title>Deliver Order</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                Are You Sure you want to Deliver Order #
                                {orderId} ?
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}>
                                  Close
                                </Button>
                                <Button
                                  type="submit"
                                  variant="danger"
                                  onClick={handleClose}>
                                  Deliver
                                </Button>
                              </Modal.Footer>
                            </Form>
                          </Modal>
                        </>
                      )}
                    </Alert>
                  )}
                  <hr />
                </div>
                <div style={{ width: "90%" }}>
                  <h4>Payment</h4>
                  <p>
                    <span>Method : </span> {order?.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Alert variant="success">
                      Paid on {formatDate(order?.paidAt)}
                    </Alert>
                  ) : (
                    <Alert variant="warning">Not Paid</Alert>
                  )}
                  <hr />
                </div>
                {order?.orderItems?.map((item) => (
                  <OrderItemDetails cart={item} key={item._id} />
                ))}
              </div>

              <div
                className="order-details"
                style={order.isPaid ? { height: "280px" } : {}}>
                <h4 className="text-center">Order Cost</h4>
                <hr />
                <div className="order-summary-cost">
                  <div className="d-flex justify-content-between">
                    <span>Items</span>
                    <span>$ {order.totalPrice}</span>
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>$ {order.shippingPrice}</span>
                    {/* <input hidden name="shippingPrice" value={shippingCost} /> */}
                  </div>

                  <div className="d-flex justify-content-between">
                    <span>Tax</span>
                    <span>$ {order.taxPrice}</span>
                    {/* <input hidden name="taxPrice" value={taxCost} /> */}
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-between">
                  <span>Total Cost</span>
                  <span>
                    ${" "}
                    {(
                      Number(order.totalPrice) +
                      Number(order.shippingPrice) +
                      Number(order.taxPrice)
                    ).toFixed(2)}
                  </span>
                </div>

                {!order?.isPaid && (
                  <div className="mt-5">
                    {isLoading && <LoadingSpinner />}
                    {!sdkReady ? (
                      <LoadingSpinner />
                    ) : (
                      <PayPalButton
                        amount={(
                          Number(order.totalPrice) +
                          Number(order.shippingPrice) +
                          Number(order.taxPrice)
                        ).toFixed(2)}
                        // onSuccess={}
                        onSuccess={(details, data) => {
                          alert(
                            "Transaction completed by " +
                              details.payer.name.given_name
                          );
                        }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
}

export default OrderPage;
