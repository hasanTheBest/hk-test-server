const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {connectToDatabase} = require("./lib/mongodb")

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
  const {database} = await connectToDatabase();

  const collection = database.collection(process.env.HKTEST_ATLAS_COLLECTION);

  const sectors = await collection.find({}).toArray();

  res.status(200).json(sectors)
})

// listen to the port
app.listen(port, () => {
  console.log("hk test  listening to the port", port);
});