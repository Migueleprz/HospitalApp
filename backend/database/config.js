'use strict'

const mongoose = require('mongoose');

const dbConn = async ()=> {
    try {

        await mongoose.connect(process.env.DB_CONN);

    } catch (e) {
        console.log(e);
        throw new Error('DB no iniciada');
    }
}
module.exports = {
    dbConn
}