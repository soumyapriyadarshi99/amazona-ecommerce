import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useReducer } from "react";

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
          <div className="loader"></div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : null}
        {products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add To Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
