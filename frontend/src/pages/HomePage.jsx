import { Col, Row } from "react-bootstrap";
import {
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

import ProductCart from "../features/Products/ProductCart";
import LoadingSpinner from "../ui/LoadingSpinner";
import Paginate from "../ui/Paginate";
import ProductCarousel from "../features/Products/ProductCarousel";

function HomePage() {
  const {
    allProducts: { products, pages, page },
    topProducts,
  } = useLoaderData();

  const [searchParams] = useSearchParams();

  const keyword = searchParams.get("keyword");

  const { state } = useNavigation();
  const isLoading = state === "loading";

  if (isLoading) return <LoadingSpinner />;

  if (!products) return;
  return (
    <>
      {!keyword && (
        <>
          <ProductCarousel products={topProducts} />
          <br />
        </>
      )}
      <h1 className="mb-3">
        {keyword ? "Searched Products" : "Latest Products"}
      </h1>
      <>
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <ProductCart product={product} key={product._id} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} />
      </>
    </>
  );
}

export default HomePage;
