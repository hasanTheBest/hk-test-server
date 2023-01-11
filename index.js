const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToDatabase } = require("./lib/mongodb")

const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


// GET SECTORS
app.get("/", async (req, res) => {
  
  const { database } = await connectToDatabase();
  const collection = database.collection(process.env.HKTEST_ATLAS_COLLECTION);

  const sectors = await collection.find({}).toArray();

  res.status(200).json(sectors)
})

// ADD A USER WITH SECTOR
router.post("/add", async (req, res) => {
  const { database } = await connectToDatabase();
  const collection = database.collection("addUserCollection");
  const result = await collection.insertOne(req.body);

  res.send(result);
});

// listen to the port
app.listen(port, () => {
  console.log("hk test  listening to the port", port);
});