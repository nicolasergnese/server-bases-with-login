const mongoose = require('mongoose');


    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to database successfully")
    } catch (error) {
        console.log(error);
        console.log("could not connect to database!");
        
    }
const db = mongoose.connection;
module.exports = db;
