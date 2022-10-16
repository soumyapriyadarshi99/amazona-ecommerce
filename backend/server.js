import express from "express";
import data from "./data.js";
import cors from "cors";

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));

app.get("/api/products", (req, res) => {
  res.send(data);
});

app.get("/api/products/slug/:slug", (req, res) => {
  const product = data.products.find((item) => item.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("product not found");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
