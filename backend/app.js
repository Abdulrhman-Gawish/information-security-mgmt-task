const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/conn");
const authRoute = require("./routes/authRoute");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(3000, async () => {
  await connectDB();
  console.log("Server Running");
});
