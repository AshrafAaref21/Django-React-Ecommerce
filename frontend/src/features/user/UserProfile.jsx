import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  Form,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { selectCurrentUser } from "./userSlice";
import LoadingSpinner from "../../ui/LoadingSpinner";

function UserProfile() {
  const currentUser = useSelector(selectCurrentUser);
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  const orders = useLoaderData();
  const navigate = useNavigate();
  console.log(orders);

  if (isLoading) return <LoadingSpinner />;
  return (
    <div className="grid-profile">
      <div
        className="update-form-container"
        // style={{ width: "60%", marginTop: "10%" }}
        // style={{ height: "auto", marginTop: "5%" }}
      >
        <h2>User Profile</h2>

        <Form method="put" style={{ alignItems: "center" }}>
          <div
            className="d-flex align-items-center"
            style={{ width: "80%", gap: "2rem" }}>
            <label htmlFor="name" style={{ width: "30%", fontWeight: "500" }}>
              Username
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Type Your Username"
              defaultValue={currentUser?.name}
              style={{ width: "70%" }}
              disabled={isLoading}
            />
          </div>
          <div
            className="d-flex align-items-center"
            style={{
              width: "80%",
              gap: "2rem",
            }}>
            <label htmlFor="email" style={{ width: "30%", fontWeight: "500" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Type Your Email"
              defaultValue={currentUser?.email}
              style={{ width: "70%" }}
              disabled={isLoading}
            />
          </div>
          <div
            className="d-flex align-items-center"
            style={{ width: "80%", gap: "2rem" }}>
            <label htmlFor="email" style={{ width: "30%", fontWeight: "500" }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Change Password if needed"
              style={{ width: "70%" }}
              disabled={isLoading}
            />
          </div>

          <input type="hidden" name="key" value={currentUser?.token} />
          <Button
            type="submit"
            style={{ marginTop: "15px", width: "100%" }}
            disabled={isLoading}>
            Update Your User
          </Button>
        </Form>
      </div>

      <div className="orders-container">
        <Table striped bordered hover style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Paid</th>
              <th>Price</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.split("T")[0]}</td>
                <td>
                  {order.isPaid ? (
                    `${order.paidAt.split("T")[0]}`
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {(
                    Number(order.shippingPrice) +
                    Number(order.taxPrice) +
                    Number(order.totalPrice)
                  ).toFixed(2)}
                </td>
                <td>
                  <Button
                    variant="dark"
                    onClick={() => navigate(`/order/${order._id}`)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserProfile;
