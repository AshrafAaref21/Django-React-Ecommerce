import { Pagination } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function Paginate({ pages, page }) {
  const [searchParams, setSearchParams] = useSearchParams();
  function handlePages(e) {
    searchParams.set("page", e.target.id);
    setSearchParams(searchParams);
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((num) => (
          <Pagination.Item
            active={num + 1 === page}
            key={num + 1}
            id={num + 1}
            onClick={handlePages}>
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;

Paginate.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
};
