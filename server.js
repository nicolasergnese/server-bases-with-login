require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const chartRoutes = require('./routes/chart');//collegamento api chart

const cardRoutes = require('./routes/card')//collegamento api


//const sqlRoutes = require('./routes/sql')
//const dbSql = require('./dbSql')


//database connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/api/chart", chartRoutes);//collegamento api chart
//app.use("/info", cardRoutes); //collegamento api card


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));




/*  const mysql = require('mysql2');

const connection = mysql.createConnection({ //connessione dati sql
host: 'sql7.freesqldatabase.com',
user: 'sql7611512',
password: 'iS5aeEdPYK',
database: 'sql7611512',
//port: 3306,
});

connection.connect(function(err) {
if (err) throw err;
console.log("Connected!");
//Insert a record in the "customers" table:
var sql = "INSERT INTO impiegati (impiegato_nome, azienda) VALUES ('Gianmarco', 'Eng')"; //query per inserire dato nel database sql
connection.query(sql, function (err, result) { //funzione che invia la query
if (err) throw err; //se c'è errore
console.log("1 record inserted");
});
});  
*/
/* 
const mqtt = require('mqtt')
const connectionMQTT  = mqtt.connect('mqtt://test.mosquitto.org') //connessione a mqtt

connectionMQTT.on('connect', function () { //funzione per connettersi
connectionMQTT.subscribe('presence', function (err) {
if (!err) {
connectionMQTT.publish('presence', 'Hello mqtt') //invia messaggi a mqtt
}
})
})

connectionMQTT.on('message', function (topic, message) { //riceve messaggi da mqtt
// message is Buffer
console.log(message.toString())
console.log("ciao")
connectionMQTT.end() //chiusura connessione
})   */

/* var Connection = require('tedious').Connection;
var config = {
  server: 'your_server.database.windows.net', //update me
  authentication: {
    type: 'default',
    options: {
      userName: 'your_username', //update me
      password: 'your_password' //update me
    }
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    //encrypt: true,
    database: 'your_database' //update me
  }
};
var connection = new Connection(config);
connection.on('connect', function (err) {
  // If no error, then good to proceed.
  console.log("Connected");
});

connection.connect(); */
const sql = require('mssql');

/* const config = {
    user: 'your-username',
    password: 'your-password',
    server: 'your-server-name',
    database: 'your-database-name',
   /*  //options: {
       // trustedConnection: true, // If using Windows authentication
       // encrypt: true, // For secure connections
    //} 
};

async function connect() {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server');
        // Perform database operations here
        // Example: execute a query
        //const result = await sql.query('SELECT * FROM your-table-name');
        //console.log(result.recordset);
        // Close the connection
        await sql.close();
    } catch (err) {
        console.error(err);
    }
}

connect(); */
/* const sql = require('mssql');

 

const config = {
    user: 'your-username',
    password: 'your-password',
    server: 'your-server-name', // You can use 'localhost\\instance' to connect to named instance
    database: 'your-database-name',
};

 

async function connect() {
    try {
        await sql.connect(config);
        console.log('Connected to MSSQL');
    } catch (err) {
        console.error(err);
    }
}

 

connect(); */