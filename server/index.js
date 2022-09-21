const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 2121;
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

// MONGOOSE CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
