const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const restaurantsRouter = require("./routes/restaurants");
const commentsRouter = require("./routes/comments");
const articlelistRouter = require("./routes/articlelist");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const menuRouter = require("./routes/menu"); 
const storeRouter = require("./routes/store");
const orderRouter = require("./routes/order");
const linepayRouter = require("./routes/linepay");
const cartRouter = require("./routes/cart");

require("dotenv").config();
// console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log("MONGO_URI:", process.env.MONGO_URI); // 測試環境變數是否正確載入

// Initialize MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Local MongoDB connected successfully"))
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/restaurants", restaurantsRouter);
app.use("/comments", commentsRouter);
app.use("/articles", articlelistRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/menu", menuRouter); 
app.use('/uploads', express.static('uploads'));
app.use("/store", storeRouter);
app.use("/order", orderRouter);
app.use("/payments/linepay", linepayRouter);
app.use("/cart", cartRouter);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
