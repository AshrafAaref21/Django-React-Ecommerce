import { useEffect, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import { Form, Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

import LoadingSpinner from "../ui/LoadingSpinner";
import CreateProduct from "../features/Products/CreateProduct";
import { selectCurrentUser } from "../features/user/userSlice";

function ProductsAdminPage() {
  const fetcher = useFetcher();
  const currentUser = useSelector(selectCurrentUser);

  const [productId, setProductId] = useState(null);

  const mappingProducts = fetcher?.data?.allProducts?.products || [];
  // console.log(`mappingProducts : ${mappingProducts}`);
  // console.log(mappingProducts);
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle") {
        fetcher.load(`/?page=${page}`);
      }
    },
    [fetcher, page]
  );

  //   console.log(fetcher.data);
  if (fetcher.state === "loading") return <LoadingSpinner />;
  if (!fetcher.data) return <h1>None</h1>;
  return (
    <>
      <div className="d-flex justify-content-between mt-3 mb-5">
        <h1>Products</h1>

        <CreateProduct />
      </div>
      {mappingProducts.length !== 0 && (
        <Table
          // striped
          bordered
          hover
          variant="light"
          style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mappingProducts.map((product) => (
              <tr key={product._id} onClick={() => setProductId(product._id)}>
                <th>{product._id}</th>
                <th>{product.name}</th>
                <th>{product.price}</th>
                <th>{product.category}</th>
                <th>{product.brand}</th>
                <th>
                  <Link to={`/admin/products/${product._id}`}>
                    <Button variant="light" size="sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </Link>

                  <Button
                    // type="submit"
                    onClick={handleShow}
                    variant="danger"
                    size="sm"
                    //   disabled={user.isAdmin}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>

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
          </Modal>
        </Table>
      )}
    </>
  );
}

export default ProductsAdminPage;
