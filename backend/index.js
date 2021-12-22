'use strict'


const express = require('express');
require('dotenv').config();
const { dbConn } = require('./database/config');
const cors = require('cors');



/*servidor express*/
const app = express();

/*lectura y parceo del body*/
app.use( express.json());

/*cofiguarion cors*/
app.use(cors());

/*conexion ala db*/
dbConn().then(()=>{
    console.log('db online')
}).catch(err=>{
    console.log(err)
});

/*rutas de usuario*/
app.use('/api/usuario', require('./routes/routeUsuarios'));
app.use('/api/login', require('./routes/routeAuth'));

/*levantamiento del servidor*/
app.listen(process.env.PORT, ()=>{
    console.log('server online')
});