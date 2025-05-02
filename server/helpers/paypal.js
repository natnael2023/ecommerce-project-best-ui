const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ATwTWHa8ZqWO9DmdbyX4oGT55XtpgikP-6KGi24QcFLbRSftc9g7mMbjMgI0kjiMT1JCMph5OeMHbVdg",
  client_secret: "EEPkJU4nVAArzdZqnoKDOL9IZXT0A2t-j27IxOyZayuWeVcR2zs1MMjtcUagQQUUGHg4J2ZkzSkpEWZP",
});

module.exports = paypal;
