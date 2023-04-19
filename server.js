require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const chartRoutes = require('./routes/chart');//collegamento api chart


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
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);

app.use("/api/chart",chartRoutes);//collegamento api chart


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
})   