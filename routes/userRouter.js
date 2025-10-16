const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const isLogin = require("../middleware/isLogin");

userRouter.get("/", (req, res) => {
  res.send(`
    <h2>Home</h2>
    ${
      req.user
        ? `<p>Welcome, ${req.user.username || req.user.displayName}</p>`
        : `<a href="/api/v1/users/auth/google">Login with Google</a>`
    }
  `);
});

userRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

userRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/api/v1/users/profile");
  }
);

userRouter.get("/profile", isLogin, (req, res) => {
  console.log(req.user);
  res.send(`
    <h1>Profile</h1> 
     ${req.user.username} - ${req.user.email}</p>
    <img src="${req.user.photo}" width="100">
  `);
});

userRouter.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.redirect("/api/v1/users/");
    });
  });
});

module.exports = userRouter;