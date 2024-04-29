import { Form, Link, useLoaderData } from "react-router-dom";

import { Button, Table, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "./userSlice";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function UsersList() {
  const users = useLoaderData();
  const currentUser = useSelector(selectCurrentUser);
  const [userId, setUserId] = useState(null);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!users?.length || typeof users === "string")
    return (
      <Alert
        variant="danger"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "14px",
          marginTop: "20px",
        }}>
        You cannot Access This page <br />
        <Link className="mt-5" to="/">
          Go To Home Page
        </Link>
      </Alert>
    );
  //   console.log(users);

  return (
    <div>
      <h1 className="mb-5 mt-3 d-flex align-items-center justify-content-center">
        Users List
      </h1>

      <Table
        striped
        bordered
        hover
        variant="light"
        style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} onClick={() => setUserId(user._id)}>
              <th>{user._id}</th>
              <th>{user.name}</th>
              <th>{user.email}</th>
              <th>
                {user.isAdmin ? (
                  <i className="fas fa-check" style={{ color: "green" }}></i>
                ) : (
                  <i className=" fas fa-times" style={{ color: "red" }}></i>
                )}
              </th>
              <th>
                <Link to={`/admin/users/${user._id}`}>
                  <Button variant="light" size="sm" disabled={user.isAdmin}>
                    <i className="fas fa-edit"></i>
                  </Button>
                </Link>

                <Button
                  // type="submit"
                  onClick={handleShow}
                  variant="danger"
                  size="sm"
                  disabled={user.isAdmin}>
                  <i className="fas fa-trash"></i>
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
        <Modal show={show} onHide={handleClose}>
          <Form method="DELETE">
            <input name={"userId"} hidden value={userId} />
            <input name="access" value={currentUser.access} hidden />
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure you want to delete User #{userId} ?
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
        </Modal>
      </Table>
    </div>
  );
}

export default UsersList;
