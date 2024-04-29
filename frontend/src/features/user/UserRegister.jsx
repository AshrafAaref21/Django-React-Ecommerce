import { Form, useActionData, useNavigation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserAlert from "./UserAlert";
import LoadingSpinner from "../../ui/LoadingSpinner";

function UserRegister() {
  const formData = useActionData();
  //   console.log("formData: ", formData);
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  const [show, setShow] = useState(false);

  useEffect(
    function () {
      setShow(Boolean(formData?.error));
    },
    [formData]
  );
  return (
    <div
      className="login-form-container"
      style={{ width: "60%", marginTop: "10%" }}>
      <h2>Regiter Now</h2>
      {formData?.error && (
        <UserAlert
          show={show}
          setShow={setShow}
          message="This Email Already Exists"
        />
      )}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Form method="post" style={{ alignItems: "center" }}>
          <input type="text" name="name" placeholder="Type Your Username" />

          <input type="email" name="email" placeholder="Type Your Email" />
          <input
            type="password"
            name="password"
            placeholder="Type Your Password"
          />

          <Button type="submit" style={{ marginTop: "15px" }}>
            Register Now
          </Button>
        </Form>
      )}
    </div>
  );
}

export default UserRegister;
