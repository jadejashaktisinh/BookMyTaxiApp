const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/route')
require('dotenv').config()

const app = express();
app.use(bodyParser.json())
app.use('/',routes)

app.listen(3001);