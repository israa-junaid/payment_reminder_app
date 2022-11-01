const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan"); // log request and error
const fileupload = require("express-fileupload");
const path = require("path");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const connectDB = require(`./config/db`);
dotenv.config({ path: "./config/config.env" });
const auth = require("./routes/auth");
const user = require("./routes/user");
const payment = require("./routes/payment");

var cron = require("cron");
const messaging = require("./firebaseInit")


connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", user);
app.use("/api/v1/payment", payment);

app.get("/", (req, res) => res.send("Welcome to Payment Reminder App Server"));
app.use(errorHandler);
const PORT = process.env.PORT || 4000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on ${PORT}`.yellow.bold
  )
);
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error : ${err.message}`);
  //close server & exit process
  server.close(() => process.exit(1));
});
