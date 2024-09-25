const mongoose = require('mongoose');
require("dotenv").config()
const mongooseConnection = mongoose.connect(process.env.MONGODB_CONNECTIONS).then(function(){
    try{}catch(err){
        console.log("Connection Failed.")
    }
});

module.exports = mongooseConnection;