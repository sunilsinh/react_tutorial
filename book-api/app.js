import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
const app = express();
import path from "path";
import mongoose from "mongoose";
import customer from "./routes/customer";
import auth from "./routes/auth";
import cors from "cors";
let dev_db_url = 'mongodb://vishal:java123@ds247944.mlab.com:47944/vishaldb';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use('/customer', customer);
app.use("/api/auth", auth);


let port = 4000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});