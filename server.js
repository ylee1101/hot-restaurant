// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// tables (DATA)
var tables = [{
  customerName: "brady",
  customerEmail: "brandy@gmail.com",
  phoneNumber: 111111,
  customerID: "brandy 2"
}, {
    customerName: "issac",
    customerEmail: "issac@gmail.com",
    phoneNumber: 22222222,
    customerID: 2
}];

var waitlist = [];

// Routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
  });


app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
  });

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  var newReservation = req.body;
  newReservation.customerName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();
  if (tables.length < 3) {
    tables.push(newReservation);
    console.log(tables);
    res.json(tables);
  } else {
    waitlist.push(newReservation);
    console.log(waitlist);
  }
});

app.delete("/api/tables", function (req, res) {
  res.json("Delete request");
});


// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});