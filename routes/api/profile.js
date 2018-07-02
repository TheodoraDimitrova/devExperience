const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load Profile Model and User Model
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// route   GET api/profiles/test
// desc    Tests profiles route
// access  Public
router.get("/test", (req, res) => res.json({ msg: "profile works" }));

// route   GET api/profile
// desc    get user info
// access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.body.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.res(profile);
      })
      .catch(e => {
        res.status(404).json(e);
      });
  }
);

module.exports = router;
