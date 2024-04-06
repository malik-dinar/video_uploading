const express = require("express");
const app = express();
const { resolve } = require("path");
const bodyParser = require("body-parser");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });
const cors = require("cors");


const mongoose = require("mongoose");
const routes = require("./router/routes");

app.use(cors());

const connectDb = async () => {
  try {
    console.log("[MONGO-DB] Connection URI -", "mongodb://localhost:27017");
    const connect = await mongoose.connect("mongodb://localhost:27017");
    console.log(
      "[MONGO-DB] Connected -",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectDb();

const detailsSchema = new mongoose.Schema({
  userName: String,
  date: { type: Date, default: Date.now },
  price : Number
});

// Create a model using the schema
const Details = mongoose.model("Details", detailsSchema);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(bodyParser.json());
app.use(express.static(process.env.STATIC_DIR));

app.use("/api", routes);

app.listen(3000, () =>
  console.log(`Node server listening at http://localhost:3000`)
);
