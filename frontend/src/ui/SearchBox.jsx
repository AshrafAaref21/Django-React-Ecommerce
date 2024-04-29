import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

function SearchBox() {
  const { pathname } = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  //   const keyword = searchParams.get("keyword");
  function handleSubmit(e) {
    e.preventDefault();
    if (!keyword) return;
    if (pathname === "/") {
      searchParams.set("keyword", keyword);
      setSearchParams(searchParams);
    } else {
      navigate(`/?keyword=${keyword}`);
    }
  }
  return (
    <Form onSubmit={handleSubmit} inline className="d-flex gap-3 me-2">
      <Form.Control
        type="text"
        name="q"
        className="mr-sm-2 ml-sm-5"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button type="submit" variant="outline-success" className="p-2">
        Search
      </Button>
    </Form>
  );
}

export default SearchBox;
