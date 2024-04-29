import { Row } from "react-bootstrap";
import {
  Link,
  useLoaderData,
  useNavigation,
  useParams,
} from "react-router-dom";
import ProductDetails from "../features/Products/ProductDetails";
// import products from "../data/products";
import LoadingSpinner from "../ui/LoadingSpinner";

function ProductPage() {
  const { productId } = useParams();

  const product = useLoaderData();
  const { state } = useNavigation();
  const isLoading = state === "loading";

  if (isLoading) return <LoadingSpinner />;

  if (!product) return;

  return (
    <div>
      Product #{productId}
      <Link to="/" className="btn btn-link btn-light ms-2 my-2">
        Go Back
      </Link>
      <Row>
        <ProductDetails product={product} />
      </Row>
    </div>
  );
}

export default ProductPage;
