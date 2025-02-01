const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/database");

const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("This is an Express application");
});

app.listen(5000, () => console.log("App is running on port 5000"));
