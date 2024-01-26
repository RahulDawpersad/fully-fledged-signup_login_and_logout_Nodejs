const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const db = require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Set the views directory and the view engine to use EJS
app.set("views", "./views");
app.set("view engine", "ejs"); // Change 'html' to 'ejs'

app.use(express.static("public"));
app.use(express.static("assets"));
app.use(express.static("vendor"));

app.use("/", authRoutes);

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
