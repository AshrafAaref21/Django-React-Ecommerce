// import { Col, Container, Row } from "react-bootstrap";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import "./login.css";
import { Button } from "react-bootstrap";
import UserAlert from "./UserAlert";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../ui/LoadingSpinner";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./userSlice";

function UserLogin() {
  const navigate = useNavigate();
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  const formData = useActionData();
  const [show, setShow] = useState(false);
  const currentUser = useSelector(selectCurrentUser);
  //   console.log(currentUser);

  useEffect(
    function () {
      if (currentUser?.access) navigate(-1);
    },
    [currentUser, navigate]
  );

  useEffect(
    function () {
      setShow(Boolean(formData?.error));
    },
    [formData]
  );
  //   function handleOnClick() {}
  return (
    <div className="user-container">
      <div className="login-form-container">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2>Log In</h2>
            {formData?.error && (
              <UserAlert
                show={show}
                setShow={setShow}
                message="Incorrect Username or Password"
              />
            )}
            <Form
              method="post"
              className=""
              //   onSubmit={(e) => {
              //     e.preventDefault();
              //   }}
            >
              {/* <label htmlFor="email">Email</label> */}

              <input id="email" type="email" name="email" placeholder="Email" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
              />

              <Button
                type="submit"
                disabled={false}
                //   onClick={handleOnClick}
              >
                Login
              </Button>
              <div className="d-flex justify-content-end mt-2">
                New Customer..?{" "}
                <span className="ms-2">
                  <Link to="/register">Register Now</Link>
                </span>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  );
}

export default UserLogin;
