const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../model/User");

// auth middleware will be used to verify the token and
// retrieve the user based on the token payload
const auth = require("../middleware/auth");

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

// route for user registration will be '/user/signin'
router.post("/signin", async (req, res) => {
  // Extract username and password from body of request
  const { email, password } = req.body;
  try {
    // Check if user exists in database
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email not registered" });
    }

    // Compare password from body with password in database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
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
    res.status(500).json({ message: "something went wrong with signin" });
  }
});

// route to retrieve user will be '/user/me'
router.get("/me", auth, async (req, res) => {
  try {
    // decoded user is getting fetched from middleware after token auth
    const user = await User.findById(req.user.id);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "something went wrong fetching user" });
  }
});

// route to post contact will be '/user/contacts'
router.post("/contacts", auth, async (req, res) => {
  // Extract contact email from body of request
  const { email } = req.body;

  try {
    // Check if contact with email already exists in database
    const contactWithEmail = await User.findOne({ email });
    if (!contactWithEmail) {
      return res.status(404).json({ message: "user is not registered" });
    }

    // Get our user
    const user = await User.findById(req.user.id);

    // Check if are trying to add ourselves
    if (email === user.email) {
      return res.status(400).json({ message: "cannot add self as a contact" });
    }

    // Check if email already exists in contact list
    const isAlreadyContact = user.contacts.includes(email);
    if (isAlreadyContact) {
      return res.status(400).json({ message: "user is already a contact" });
    }

    // Set new contacts list that includes new email
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { contacts: [...user.contacts, email] },
      { new: true }
    );

    const updatedContacts = updatedUser.contacts;

    res.status(200).json({ updatedContacts });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "something went wrong adding new contact" });
  }
});

// route to delete contact will be '/user/contacts'
router.delete("/contacts/:email", auth, async (req, res) => {
  // Get email from params
  const { email } = req.params;

  try {
    // Get our user
    const user = await User.findById(req.user.id);

    // Check if email exists in contact list
    const isContact = user.contacts.includes(email);
    if (!isContact) {
      return res.status(400).json({ message: "user is not a contact" });
    }

    // Set new contacts list that does not include email
    const index = user.contacts.indexOf(email);
    if (index < 0) {
      return res
        .status(400)
        .json({ message: "something went wrong removing contact" });
    }

    user.contacts.splice(index, 1);

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { contacts: user.contacts },
      { new: true }
    );

    updatedContacts = updatedUser.contacts;

    res.status(200).json({ updatedContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong removing contact" });
  }
});

module.exports = router;
