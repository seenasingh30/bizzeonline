const mongoose = require("mongoose");
const config = require("../config");
const Promise = require("bluebird");

module.exports = (app) =>
  new Promise(async (resolve, reject) => {
    console.log("Boot script - Starting initdb");
    try {
      await mongoose.connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
        keepAlive: true,
      });
    } catch (error) {
      reject(error);
    }
    console.log("Boot script - initializing default_admin");
    resolve();
  });
