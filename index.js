const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();


const port = process.env.PORT || 5000;
const app = express();

// middleware
app.use(cors());
app.use(express.json());


/**
 * DB Connection
 * */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@hktestcluster.mtebihe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// async function run() {
//   try {
//     await client.connect();
//     console.log("db is connected");

//     // Sectors
//     // Collections
//     const sectorCollection = client
//       .db("hk-test-101")
//       .collection("sectorCollection");


//       // // base url
// app.get("/", async (req, res) => {
//   const sectors = await sectorCollection.find().toArray();

//   res.send(sectors)
// });

    
//   } finally {
//     // await client.close();
//   }
// }

// base url 
app.get("/", (req, res) => {
  res.send("Server is working.")
})

// run().catch(console.dir);





// listen to the port
app.listen(port, () => {
  console.log("hk test  listening to the port", port);
});