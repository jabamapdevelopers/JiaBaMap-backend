const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const mongoose = require("mongoose");

const restaurantsRouter = require("./routes/restaurants");
const commentsRouter = require("./routes/comments");
const articlelistRouter = require("./routes/articlelist");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const storeRouter = require("./routes/store");
const orderRouter = require("./routes/order");
const linepayRouter = require("./routes/linepay");

require("dotenv").config();

// Initialize MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected successfully");
});

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/restaurants", restaurantsRouter);
app.use("/comments", commentsRouter);
app.use("/articles", articlelistRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/store", storeRouter);
app.use("/order", orderRouter);
app.use("/payments/linepay", linepayRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
