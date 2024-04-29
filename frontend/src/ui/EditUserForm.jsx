import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

import {
  Form,
  useLoaderData,
  //   useNavigate,
  useNavigation,
} from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";
import { selectAccessToken } from "../features/user/userSlice";

function EditUserForm() {
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  const currentUser = useLoaderData();
  const accessToken = useSelector(selectAccessToken);
  //   console.log(currentUser);

  if (isLoading) return <LoadingSpinner />;
  //   return <h1>User Edit</h1>;
  return (
    <div className="update-form-container my-5">
      <h2 className="mb-5">Edit User</h2>
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

        <input type="hidden" name="key" value={accessToken} />

        <div
          className="d-flex align-items-center"
          style={{
            width: "80%",
            gap: "2rem",
            marginTop: "0.2rem",
          }}>
          <div style={{ width: "30%", fontWeight: "500" }}></div>
          <div>
            <input type="checkbox" id="isAdmin" name="isAdmin" />
            <label
              htmlFor="isAdmin"
              style={{ fontSize: "20px", marginLeft: "10px" }}>
              Is Admin ?
            </label>
          </div>
        </div>
        <Button
          type="submit"
          style={{ marginTop: "15px", width: "100%" }}
          disabled={isLoading}>
          Update Your User
        </Button>
      </Form>
    </div>
  );
}

export default EditUserForm;
