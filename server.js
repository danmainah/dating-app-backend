import express from "express";
import mongoose from "mongoose";
import Cors from 'cors'
import Cards from "./dbCards.js";
//App Config
const app = express();
const port = process.env.PORT || 8001;
const dbpath = "mongodb+srv://dating-app:8I9d0zncZgDgHCkT@cluster0.dt6fgeu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//Middleware
app.use(express.json())
app.use(Cors())
//DB Config
mongoose.connect(dbpath, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to the database successfully');
});
//API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"));
app.post("/dating/cards", async (req, res) => {
    const dbCard = req.body;
    try {
      const data = await Cards.create(dbCard);
      res.status(201).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  
  app.get("/dating/cards", async (req, res) => {
    try {
      const data = await Cards.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send(err);
    }
  });
//Listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
