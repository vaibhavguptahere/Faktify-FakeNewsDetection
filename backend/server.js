const express = require('express')
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()


const port = 3000

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'Faktify';
const app = express()

client.connect();

// This is the MongoDB connection string
console.log(process.env.MONGO_URI)
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
