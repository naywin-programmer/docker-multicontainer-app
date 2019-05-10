// Express Set Up
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const http = express();
http.use(cors());
http.use(bodyParser.json());

module.exports = http;