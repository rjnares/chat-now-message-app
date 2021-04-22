const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");

// auth middleware will be used to verify the token and
// retrieve the user based on the token payload
const auth = require("../middleware/auth");

/**
 * @method - POST
 * @param - /signup
 * @description - User signup
 */

// route for user registration will be '/user/signup'
router.post("/signup", async (req, res) => {
  // Extract first name, last name, username, email,
  // and password from body of request
  const { firstName, lastName, username, email, password } = req.body;

  try {
    // Check if user with email already exists in database
    let userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return res
        .status(400)
        .json({ message: "user with this email already exists" });
    }

    // Check if user with username already exists in database
    let userWithUsername = await User.findOne({ username });
    if (userWithUsername) {
      return res
        .status(400)
        .json({ message: "user with this username already exists" });
    }

    // If user does not exist, create new user
    let user = new User({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    // Use bcrypt to encrypt the user password for storage in database
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(password, salt);

    // Save new user (with encrypted password) to database
    await user.save();

    const payload = { user: { id: user.id } };

    // Sign payload into JSON Web Token set to expire in 1 hour
    // Will use token to retrieve signed in user
    jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong with signup" });
  }
});

/**
 * @method - POST
 * @param - /signin
 * @description - User signin
 */

// route for user registration will be '/user/signin'
router.post(
  "/signin",
  [
    check("username", "Please enter a valid username").not().isEmpty(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check for validation errors in request; if any, let requester know
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract username and password from body of request
    const { username, password } = req.body;
    try {
      // Check if user exists in database
      let user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Compare password from body with password in database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password" });
      }

      const payload = { user: { id: user.id } };

      // Sign payload into JSON Web Token set to expire in 1 hour
      // Will use token to retrieve signed in user
      jwt.sign(payload, "randomString", { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error in signin" });
    }
  }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */

// route to retrieve user will be '/user/me'
router.get("/me", auth, async (req, res) => {
  try {
    // decoded user is getting fetched from middleware after token auth
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error fetching user" });
  }
});

module.exports = router;
