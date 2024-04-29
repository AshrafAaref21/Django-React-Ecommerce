import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

import { formatDateYearly } from "../utils/helper";
import LoadingSpinner from "../ui/LoadingSpinner";

function OrdersAdminPage() {
  const orders = useLoaderData();
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  console.log(orders);

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="d-flex justify-content-between mt-3 mb-5">
        <h1>Orders</h1>
      </div>

      {orders.length !== 0 && (
        <Table
          // striped
          bordered
          hover
          variant="light"
          style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <th>{order._id}</th>
                <th>{order.user.name}</th>
                <th>{formatDateYearly(order.createdAt)}</th>
                <th>
                  ${" "}
                  {(
                    Number(order.totalPrice) +
                    Number(order.taxPrice) +
                    Number(order.shippingPrice)
                  ).toFixed(2)}
                </th>
                <th>
                  {order.isPaid ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className=" fas fa-times" style={{ color: "red" }}></i>
                  )}
                </th>
                <th>
                  {order.isDelivered ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className=" fas fa-times" style={{ color: "red" }}></i>
                  )}
                </th>

                <th>
                  <Link to={`/order/${order._id}`}>
                    <Button variant="dark" size="sm">
                      Details
                    </Button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
          {/* 
          <Modal show={show} onHide={handleClose}>
            <Form method="DELETE">
              <input hidden name="id" value="delete-form" />
              <input name={"productId"} hidden value={productId} />
              <input name="access" value={currentUser.access} hidden />
              <Modal.Header closeButton>
                <Modal.Title>Product User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are You Sure you want to Product User #{productId} ?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="danger" onClick={handleClose}>
                  Delete
                </Button>
              </Modal.Footer>
            </Form>
          </Modal> */}
        </Table>
      )}
    </>
  );
}

export default OrdersAdminPage;
