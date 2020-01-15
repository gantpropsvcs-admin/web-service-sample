const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const routes = require('../V1/routes/routes.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});