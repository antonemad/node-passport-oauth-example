const express = require("express");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
const googleStrategy = require("./utils/googleStrategy");
const session = require("express-session");
const User = require("./model/userModel");
const userRouter = require("./routes/userRouter");
const MongoStore = require("connect-mongo");
const { default: mongoose } = require("mongoose");
const app = express();

//middleware
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
    cookie: {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

//routes

app.use("/api/v1/users", userRouter);

module.exports = app;
