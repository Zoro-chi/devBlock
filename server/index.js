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
const convoRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

// MONGOOSE CONNECTION
connectDB();

// MIDDLEWARE
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 })
);
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
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
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
app.use("/api/message", messageRoute);
app.use("/api/conversation", convoRoute);

const PORT = process.env.PORT || 2121;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
