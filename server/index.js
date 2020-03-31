let express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./db/users");
const db = require("./db/index");
const Client = require("./db/clients");
const mustang = require("./mustang");

var app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());

app.use(express.static("dist"));

//routes
app.get('/', (req, res) => {
  res.send('hello world!');
})

//this route finds all of the clients already made
app.get("/findClients", async (req, res) => {
  const clients = await Client.find(
    {},
    { firstName: 1, lastName: 1, email: 1, uid: 1, _id: 0 }
  );
  try {
    res.send(clients);
  } catch (err) {
    res.status(502).send(err);
  }
});

//this route creates a new client
app.post(
  "/newClient/:clientFirstName/:clientLastName/:email/:uid",
  async (req, res) => {
    await Client.create({
      firstName: req.params.clientFirstName,
      lastName: req.params.clientLastName,
      email: req.params.email,
      uid: req.params.uid,
      simulation: false
    });
    try {
      res.status(200).send("done");
    } catch (err) {
      res.status(502).send(err);
    }
  }
);

//this route grabs all the information for a single client for the dashboard
app.get("/dashboard/:email", async (req, res) => {
  const client = await Client.find({ email: req.params.email });
  try {
    res.status(200).send(client);
  } catch (err) {
    res.status(502).send(err);
  }
});

app.patch("/mustangRun", async (req, res) => {
  console.log("this is req.body: ", req.body.params);
  let nestEggHoldArray = [];
  let taxHoldArray = [];
  let successHoldNum = 0;
  for (let i = 0; i < 100; i++) {
    let magic = mustang(
      req.body.params.age,
      req.body.params.savings,
      req.body.params.RothIRA,
      req.body.params.IRA,
      req.body.params.Traditional401K,
      req.body.params.Traditional,
      req.body.params.AnnualBudget,
      req.body.params.AnnualPensions,
      req.body.params.SocialSecurityAge,
      req.body.params.SocialSecurity,
      req.body.params.otherIncome,
      req.body.params.totalDebts,
      req.body.params.status
    );
    if (magic[0] === true) {
      successHoldNum++;
    }
    taxHoldArray.push(magic[1]);
    nestEggHoldArray.push(magic[2]);
  }

  const filter = { email: req.body.params.email };
  const update = {
    nestEgg: nestEggHoldArray,
    taxes: taxHoldArray,
    success: successHoldNum,
    simulation: true,
    age: req.body.params.age,
    savings: req.body.params.savings,
    RothIRA: req.body.params.RothIRA,
    IRA: req.body.params.IRA,
    Traditional401K: req.body.params.Traditional401K,
    Traditional: req.body.params.Traditional,
    annualBudget: req.body.params.AnnualBudget,
    annualPensions: req.body.params.AnnualPensions,
    SocialSecurityAge: req.body.params.SocialSecurityAge,
    SocialSecurity: req.body.params.SocialSecurity,
    otherIncome: req.body.params.otherIncome,
    debts: req.body.params.totalDebts,
    status: req.body.params.status
  };
  const mustangUpdate = await Client.findOneAndUpdate(filter, update, {
    new: true
  });
  try {
    res.status(200).send(mustangUpdate);
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('Hello world listening on port', PORT);
});

module.exports = app;
