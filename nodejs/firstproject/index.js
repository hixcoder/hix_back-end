const express = require("express");

const app = express();

// for accept body parameters
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello in my first nodejs project");
});

// this is get request
app.get("/hello", (req, res) => {
  res.send("");
});

// this is post request
app.post("/addcommment", (req, res) => {
  res.send("hello post request");
});

// here we use path params
app.get("/findSum/:n1/:n2", (req, res) => {
  console.log(req.params);
  let n1 = parseInt(req.params.n1);
  let n2 = parseInt(req.params.n2);
  res.send(`the sum of : ${n1} + ${n2} = ${n1 + n2}`);
});

// here we use body params
app.get("/sayHello/", (req, res) => {
  console.log(req.body);
  res.send(`hello to ${req.body.name}`);
});

// here we use query params
app.get("/sayHi/", (req, res) => {
  console.log(req.query);
  res.send(`hi to ${req.query.name} ${req.query.nickname}`);
});

app.listen(3000, () => {
  console.log("i am listening in port 3000");
});
