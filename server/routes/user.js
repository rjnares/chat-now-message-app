// route for user registration will be '/user/signup'
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User signup
 */

router.post(
  "/signup",
  [
    check("firstName", "Please enter a valid first name").not().isEmpty(),
    check("lastName", "Please enter a valid last name").not().isEmpty(),
    check("username", "Please enter a valid username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    // Check for validation errors in request; if any, let requester know
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    // Extract first name, last name, username, email,
    // and password from body of request
    const { firstName, lastName, username, email, password } = req.body;

    try {
      // Check if user already exists in database
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // If user does not exist, create new user
      user = new User({
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

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign in new user for 1 hour and return new user ID in payload
      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ user, token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in signup");
    }
  }
);

module.exports = router;
