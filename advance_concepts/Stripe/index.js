const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config({ path: "../../.env" });
const { PUBLISHABLE_KEY, Secret_key } = process.env;
const stripe = require("stripe")(Secret_key);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
  bodyParser.json()
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/stripe", (req, res) => {
  res.render("home", {
    key: PUBLISHABLE_KEY,
  });
});

app.post("/payment", (req, res) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken,
      name: "Gourav Hammad",
      address: {
        line1: "TC 9/4 Old MES colony",
        postal_code: "452331",
        city: "Indore",
        state: "Madhya Pradesh",
        country: "India",
      },
    })
    .then((customer) => {
      return stripe.paymentIntents.create({
        amount: 2500,
        description: "Web Development Product",
        currency: "usd",
        customer: customer.id,
      });
    })
    .then((charge) => {
      console.log(charge);
      res.send("Success");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(3050, (err) => {
  if (err) throw err;
  else console.log("Running at port 3050");
});
