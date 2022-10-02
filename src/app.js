const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express();

const publicpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);

app.use(express.static(publicpath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ankur  Gupta",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Ankur  Gupta",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ankur  Gupta",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  geoCode(req.query.address, (error, data = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(data.Latitude, data.Longitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: forecastdata,
        location: data.Location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a Search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ankur Gupta",
    errorMessage: "Help Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ankur Gupta",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
