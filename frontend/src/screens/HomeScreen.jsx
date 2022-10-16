import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from "../components/Product";
import Loading from "../components/Loading";
import Error from "../components/Error";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
  }
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    products: [],
  });

  // const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const result = await axios.get("http://localhost:5000/api/products");
      dispatch({ type: "FETCH_SUCCESS", payload: result.data.products });
    } catch (error) {
      dispatch({ type: "FETCH_FAIL", payload: error.message });
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <h1>Featured products</h1>
      <div className="products">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) :
          (<Row>
            {
              products.map((product) => (
                <Col key={product.slug}  sm={6} md={4} lg={3} className="mb-3" >
                <Product product={product} />
                </Col>
              ))
            }
          </Row>)
        }
      </div>
    </div>
  );
};

export default HomeScreen;
