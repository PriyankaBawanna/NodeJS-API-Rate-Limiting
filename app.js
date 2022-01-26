const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const port = 3000;

const limiter = rateLimit({
  windowMs: 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
});

// Apply to all requests
app.use(limiter); // app.use("/api/", limiter);

app.get("/", limiter, (req, res) => res.send("Hello World!"));

app.get("/", limiter, (req, res) => {
  console.log("I am the first route");
  res.send("Welcome to Vidhya Skill School");
});

app.get("/priyanka", limiter, (req, res) => {
  res.send("My name is Priyanka. I'm from Indore");
});

app.get("/arun", limiter, (req, res) => {
  res.send("My name is Arun. I'm from Morena");
});

app.get("/nikhil", limiter, (req, res) => {
  const response = {
    name: "Nikhil",
    city: "Dhule",
    message: "My name is Nikhil. I'm from Dhule",
  };
  res.json(response);
});

app.get("/prakash", limiter, (req, res) => {
  res.send("My name is Prakash. I', from Tirupur");
});

app.post("/register-user", (req, res) => {
  const response = {
    message: "Post request loaded successfully",
  };
  res.json(response);
});

app.delete("/user", (req, res) => {
  res.send("I am a delete request");
});

app.get("/user", (req, res) => {
  res.send("I am a Get User");
});

app.post("/user", (req, res) => {
  res.send("I am a create User");
});

app.put("/user", (req, res) => {
  res.send("I'm a put request");
});

app.get("/fly", (req, res) => {
  const { name } = req.query;
  if (!name) {
    const response = {
      data: {},
      meta: {
        message: "Name is a mandatory params",
        code: 400,
      },
    };
    return res.status(400).json(response);
  }

  const response = {
    data: {
      message: `My name is ${name}`,
    },
    meta: {
      message: "Name is a mandatory params",
      code: 400,
    },
  };
  return res.json(response);
});
////

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // Start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});
app.get("/create-account", createAccountLimiter, (req, res) =>
  res.send("Hello World!")
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
