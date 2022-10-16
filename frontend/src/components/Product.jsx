import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "../components/Rating";

const Product = (props) => {
  const { product } = props;
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <Card.Img src={product.image} alt={product.name} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>
          <strong>${product.price}</strong>
        </Card.Text>
        <Button>Add To Cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
