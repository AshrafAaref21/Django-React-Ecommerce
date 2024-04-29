import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Form, useFetcher, useParams, useNavigation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../features/user/userSlice";

function ProductAdminPage() {
  const { productId } = useParams();
  const fetcher = useFetcher();
  const data = useNavigation();
  const isLoading = data.state !== "idle";
  const access = useSelector(selectAccessToken);

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === "idle")
        fetcher.load(`/product/${productId}`);
    },
    [fetcher, productId]
  );

  //   console.log(fetcher.data);
  return (
    <div
      className="login-form-container"
      style={{ width: "70%", fontSize: "13px" }}>
      <h2 style={{ fontSize: "18px" }}>Product Admin Page # {productId}</h2>

      <Form
        method="put"
        style={{ alignItems: "center" }}
        encType="multipart/form-data">
        <div
          className="d-flex align-items-center"
          style={{ width: "80%", gap: "2rem" }}>
          <label htmlFor="name" style={{ width: "30%", fontWeight: "500" }}>
            Name
          </label>

          <input
            id="name"
            name="name"
            placeholder="Product Name"
            defaultValue={fetcher.data?.name}
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
          <label
            htmlFor="description"
            style={{ width: "30%", fontWeight: "500" }}>
            Description
          </label>
          <input
            id="description"
            name="description"
            placeholder="Product Description"
            defaultValue={fetcher.data?.description}
            style={{ width: "70%" }}
            disabled={isLoading}
          />
        </div>
        <div
          className="d-flex align-items-center"
          style={{ width: "80%", gap: "2rem" }}>
          <label htmlFor="brand" style={{ width: "30%", fontWeight: "500" }}>
            Brand
          </label>
          <input
            id="brand"
            name="brand"
            placeholder="Product Brand"
            defaultValue={fetcher.data?.brand}
            style={{ width: "70%" }}
            disabled={isLoading}
          />
        </div>

        <div
          className="d-flex align-items-center"
          style={{ width: "80%", gap: "2rem" }}>
          <label htmlFor="category" style={{ width: "30%", fontWeight: "500" }}>
            Category
          </label>
          <input
            id="category"
            name="category"
            placeholder="Product Category"
            defaultValue={fetcher.data?.category}
            style={{ width: "70%" }}
            disabled={isLoading}
          />
        </div>

        <div
          className="d-flex align-items-center"
          style={{ width: "80%", gap: "2rem" }}>
          <label htmlFor="price" style={{ width: "30%", fontWeight: "500" }}>
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min={1}
            step="0.01"
            placeholder="Product Price"
            defaultValue={fetcher.data?.price}
            style={{ width: "70%" }}
            disabled={isLoading}
          />
        </div>

        <div
          className="d-flex align-items-center"
          style={{ width: "80%", gap: "2rem" }}>
          <label
            htmlFor="countInStock"
            style={{ width: "30%", fontWeight: "500" }}>
            Stock
          </label>
          <input
            id="countInStock"
            name="countInStock"
            placeholder="Product Stock"
            type="number"
            min={1}
            defaultValue={fetcher.data?.countInStock}
            style={{ width: "70%" }}
            disabled={isLoading}
          />
        </div>

        <div
          className="d-flex align-items-center"
          style={{ width: "80%", gap: "2rem" }}>
          <label htmlFor="image" style={{ width: "30%", fontWeight: "500" }}>
            Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            style={{ width: "70%" }}
            // onChange={}
            disabled={isLoading}
          />
        </div>

        <input type="hidden" name="key" value={access} />

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

export default ProductAdminPage;
