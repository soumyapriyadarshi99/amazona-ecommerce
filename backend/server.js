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

const port = process.env.PORT || 5000;

app.get("/api/products", (req, res) => {
  res.send(data);
});

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
