const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');
const api = require('./api');
const serverUtils = require('./utils/serverUtils');
const PORT = process.env.PORT || 5000;
var config = require("./config");
mongoose.set('debug', true);
app.use(cors());
const startApp = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use('/api', api);
    // static files
    app.use(express.static(path.join(__dirname, 'assets')));
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}


serverUtils.boot(app).then(
    () => {
      console.log("Starting index.js - starting app from last else");
      startApp();
    },
    (err) => {
      console.error(err);
    }
  );