const express = require("express");
const router = express.Router();
const db = require("../database");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/signup", (req, res) => {
  res.render("signup", { alertMessage: "" });
});

router.post("/signup", async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) {
      return res.render("signup", { alertMessage: "Passwords do not match" });
    }

    const emailExistsQuery = "SELECT * FROM users WHERE email = ?";
    const [existingEmails] = await db.promise().execute(emailExistsQuery, [email]);

    if (existingEmails.length > 0) {
      return res.render("signup", { alertMessage: "Email or Password is already exists. Please try again." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = "INSERT INTO users (email, password, signup_date) VALUES (?, ?, NOW())";
    await db.promise().execute(insertQuery, [email, hashedPassword]);
    res.redirect("/login");
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send("Error during signup. Please try again.");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { alertMessage: "" });
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    email = email.toLowerCase();

    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.promise().execute(query, [email]);

    if (rows.length > 0) {
      const match = await bcrypt.compare(password, rows[0].password);

      if (match) {
        req.session.userId = rows[0].id;
        res.redirect('/dashboard');
      } else {
        res.render("login", { alertMessage: "Invalid email or password. Please try again." });
      }
    } else {
      res.render("login", { alertMessage: "Invalid user account. Please try again." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Error during login. Please try again.");
  }
});

router.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.render("dashboard");
  } else {
    res.redirect("/login");
  }
});

router.get("/user/email", async (req, res) => {
  try {
    if (req.session.userId) {
      const query = "SELECT email FROM users WHERE id = ?";
      const [results] = await db.promise().execute(query, [req.session.userId]);

      if (results.length > 0) {
        res.json({ email: results[0].email });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error fetching user email:", error);
    res.status(500).json({ error: "Error fetching user email" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
