const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcrypt");

// Default Route - Render index page
router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  // Pass an empty alert message initially
  res.render("signup", { alertMessage: "" });
});

router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    // Check if passwords match
    if (password !== confirmPassword) {
      // Pass the alert message to display in the signup page
      return res.render("signup", { alertMessage: "Passwords do not match" });
    }

    // Check if the email already exists in the database
    const emailExistsQuery = "SELECT * FROM users WHERE email = ?";
    const [existingEmails] = await db.promise().execute(emailExistsQuery, [email]);

    if (existingEmails.length > 0) {
      // Pass the alert message to display in the signup page
      return res.render("signup", { alertMessage: "Email or Password is already exists. Please try again." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const insertQuery = "INSERT INTO users (email, password, signup_date) VALUES (?, ?, NOW())";
    await db.promise().execute(insertQuery, [email, hashedPassword]);
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error during signup. Please try again.");
  }
});

router.get("/login", (req, res) => {
  // Pass an empty alert message initially
  res.render("login", { alertMessage: "" });
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    // Convert email to lowercase
    email = email.toLowerCase();

    // Check if the email and password match (case-sensitive)
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.promise().execute(query, [email]);

    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].password);

      if (match) {
        req.session.userId = rows[0].id;
        res.redirect('/dashboard');
      } else {
        // Pass the alert message to display in the login page
        res.render("login", { alertMessage: "Invalid email or password. Please try again." });
      }
    } else {
      // Pass the alert message to display in the login page
      res.render("login", { alertMessage: "Invalid user account. Please try again." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error during login. Please try again.");
  }
});

router.get("/dashboard", (req, res) => {
  // Check if the user is authenticated, if yes, render dashboard, else redirect to login
  if (req.session.userId) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
});

// GET USER EMAIL
router.get("/user/email", (req, res) => {
  if (req.session.userId) {
    const query = "SELECT email FROM users WHERE id = ?";
    db.query(query, [req.session.userId], (error, results) => {
      if (error) {
        console.error("Error fetching user email:", error);
        res.status(500).json({ error: "Error fetching user email" });
      } else {
        if (results.length > 0) {
          res.json({ email: results[0].email });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      }
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/"); // Redirect to the index page ("/") after logout
});

module.exports = router;
