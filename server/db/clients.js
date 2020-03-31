const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  simulation: {
    type: Boolean,
    required: true
  },
  nestEgg: {
    type: Array
  },
  taxes: {
    type: Array
  },
  IRA: {
    type: Number
  },
  Traditional: {
    type: Number
  },
  Traditional401K: {
    type: Number
  },
  savings: {
    type: Number
  },
  RothIRA: {
    type: Number
  },
  age: {
    type: Number
  },
  annualBudget: {
    type: Number
  },
  annualPensions: {
    type: Number
  },
  SocialSecurityAge: {
    type: Number
  },
  SrocialSecurity: {
    type: Number
  },
  otherIncome: {
    type: Number
  },
  debts: {
    type: Number
  },
  status: {
    type: String
  },
  success: {
    type: Number
  },
  uid: {
    type: String
  }
});
const Client = mongoose.model("Client", ClientSchema, "Clients");
module.exports = Client;
