require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const chartRoutes = require('./routes/chart');//collegamento api chart

//database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

// routes
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

//app.use("/api/chart",chartRoutes);//collegamento api chart

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));