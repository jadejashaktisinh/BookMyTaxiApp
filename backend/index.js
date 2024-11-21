const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const route = require('./routes/routes')
const app = express();

require('./Database/dbconnection')
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


app.use('/',route)



app.listen(3001,()=>{

});
