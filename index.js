const express = require("express");
const { ObjectId } = require("mongodb");
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
app.post("/add", async (req, res) => {
  const { database } = await connectToDatabase();
  const collection = database.collection("addUserCollection");

  const result = await collection.insertOne(req.body);

  res.send(result);
});

// VIEW USERS AND SECTORS INVOLVED TO
app.get("/view", async (req, res) => {
  const { database } = await connectToDatabase();
  const addUserCollection = database.collection("addUserCollection");

  const query = {};
  const options = {
    sort: {
      _id: -1
    }
  };

  const cursor = addUserCollection.find(query, options);
  const result = await cursor.toArray();

  // send the data
  res.send(result);
});

// GET A USER AND SECTORS
app.get("/view/:id", async (req, res) => {
  const { database } = await connectToDatabase();
  const addUserCollection = database.collection("addUserCollection");

  const { id } = req.params;

  const query = {
    _id: ObjectId(id),
  };

  const response = await addUserCollection.findOne(query);

  // send data
  res.send(response);
});

// EDIT USER AND SECTORS
app.put("edit/:id", async (req, res) => {
  const { database } = await connectToDatabase();
  const addUserCollection = database.collection("addUserCollection");

  const { id } = req.params;

  const filter = {
     _id: ObjectId(id),
  };

  const options = {
    upsert: true,
  };

  const updateDoc = {
    $set: req.body,
  };

  const result = await addUserCollection.updateOne(filter, updateDoc, options);

  
  res.send(result);
});

// listen to the port
app.listen(port, () => {
  console.log("hk test  listening to the port", port);
});