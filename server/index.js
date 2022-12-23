require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/AuthRoutes");
const authAdminRoutes = require('./Routes/AuthAdminRouther');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

app.use('/Uploads', express.static('Uploads'))

app.listen(4000, () => {
  console.log("Server started at PORT 4000");
});

mongoose
  .connect("mongodb://localhost:27017/serverJwt", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongoose connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST",'DELETE'],
    credentials: true,
  })
);


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/admin", authAdminRoutes);
