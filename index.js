"use strict";

// Use dotenv to load enviroment variable for sendgrid
require("dotenv").config();

const express = require("express"),
  compression = require("compression"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  flash = require("connect-flash"),
  sgMail = require("@sendgrid/mail"),
  sm = require("sitemap"),
  daysout = require("./public/js/daysout.js");


const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sitemap = sm.createSitemap({
  hostname: "https://sltaxicatterick.co.uk",
  cacheTime: 600000, // 600 sec - cache purge period
  urls: [
    { url: "/", changefreq: "daily", priority: 0.3 },
    { url: "/station", changefreq: "monthly", priority: 0.7 },
    { url: "/airport" },
    { url: "/blogs", changefreq: "daily", priority: 0.4 },
    { url: "/blogs/taxiguide" },
    { url: "/blogs/daysout", changefreq: "daily", priority: 0.5 }, // changefreq: 'weekly',  priority: 0.5
    { url: "/contact" },
  ],
});
app.use(compression());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public", { maxAge: 1 }));

app.set("view engine", "ejs");

app.use(
  require("express-session")({
    secret: "This is the secret to encode the password",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());

app.use(function (req, res, next) {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/station", (req, res) => {
  res.render("station");
});

app.get("/airport", (req, res) => {
  res.render("airport");
});

app.get("/blogs", (req, res) => {
  res.render("blogs");
});

app.get("/blogs/taxiguide", (req, res) => {
  res.render("blogs/taxiguide");
});

app.get("/blogs/daysout", (req, res) => {
  res.render("blogs/daysout", { daysout: daysout });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/ads.txt", (req, res) => {
  res.status(200).sendFile("~/ads.txt");
});

app.get("/sitemap.xml", function (req, res) {
  sitemap.toXML(function (err, xml) {
    if (err) {
      return res.status(500).end();
    }
    res.header("Content-Type", "application/xml");
    res.send(xml);
  });
});

app.get("*", (req, res) => {
  res.render("notfound");
});

let success = true;

app.post("/contact", function (req, res) {
  var message = "<html><head><title></title></head><body>";

  for (let key in req.body) {
    if (key !== 'url') {
      message += `<p>${key}: ${req.body[key]}</p>`;
    }
    else if (req.body[key] !== "") {
      return res.redirect("/");
    }
  }
  message += "</body></html>";
  var msg = {
    to: "sltaxicatterick@gmail.com",
    from: "sltaxicatterick@gmail.com",
    subject: "Message from website",
    html: `${message}`,
  };

  sgMail.send(msg)
    .then((response) => { console.log(`Email sent`) })
    .catch((err) => { console.log(`Error ${err}`) })
  req.flash("success", "Message sent thanks, we'll get back to you asap.");
  res.redirect("/");
});

app.listen(4000, () => console.log("Server running on port 3000"));
