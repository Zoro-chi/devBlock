const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db");
require("dotenv").config({ path: path.resolve(__dirname, "./config/.env") });

// Passport config
require("./config/passport")(passport);

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");

// MONGOOSE CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json());
// app.use(express.urlencoded({}))
app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// SESSIONS
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 2121;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
