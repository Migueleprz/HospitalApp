const express = require('express');
require('dotenv').config();
const { dbConn } = require('./database/config');
const cors = require('cors');

const app = express();
app.use(cors());
dbConn().then(()=>{
    console.log('db online')
}).catch(err=>{
    console.log(err)
});

app.listen(process.env.PORT, (req, res)=>{
    console.log('server online')
});