require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const chartRoutes = require('./routes/chart');//collegamento api chart Value
const chartRoutesDateTime = require('./routes/chartDateTime')//collegamento api chart DateTime

//const offersRoutes = require('./routes/offers'); //collegamento api offers


//const sqlRoutes = require('./routes/sql')
//const dbSql = require('./dbSql')


//database connection
//db.on('error', console.error.bind(console, 'MongoDB connection error:'))


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
//app.use("/api/offers", offersRoutes) //collegamento api per tabella offers
app.use("/api/chartDateTime", chartRoutesDateTime)


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));


/*
const mqtt = require('mqtt') //connessione a mqtt online generico,  ancora non testato sul loro mqtt
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
})    */

/* 
const sql = require('mssql'); //qui invece con il metodo mssql mi da credenziali errate
const config = {
    user: 'Read_Only_ENG_MATRYCS',
    password: 'MATRYCS2021!',
    server: '172.16.1.136', // You can use 'localhost\\instance' to connect to named instance, telnet 172.16.1.136 1433
    database: 'Runtime',
    options: {
      encrypt: false // Use this if you're connecting to Azure SQL Database with true
    }
};

async function executeQuery() {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT DateTime, Value
      FROM dbo.History
      WHERE tagName = 'min_DB_ENM_001638.Cv'
      AND DateTime between '2022-07-01 00:00:00'
      AND  '2022-07-01 01:00:00'
    `);
    
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    sql.close();
  }
}

executeQuery(); */

/*
async function connect() {
  try {
      await sql.connect(config);
      console.log('Connected to MSSQL');
  } catch (err) {
      console.error(err);
      console.log(err)
  }
}
  
 async function executeQuery() {
  try {
    // Create a new connection pool
    connect();
    const result = await sql.query`SELECT DateTime,Value FROM dbo.History WHERE  tagName = 'min_DB_ENM_001638.Cv' AND dateTime >= '2022-07-01 00:00:00' AND dateTime < '2022-08-01 00:00:00'`;
    //console.log(result.recordset);
    /* const query= "SELECT * FROM dbo.history";
    // Execute the query asynchronously
    const result = await sql.query(query);
    // Access the fetched records
    console.log(result.recordset);
    // Close the connection pool
    await sql.close(); 
  } catch (error) {
    console.error('Error:', error);
  }
}
// Call the executeQuery function
executeQuery(); */



/* const sql = require("msnodesqlv8") //qui mi da credenziali errate, anche se la query è errata
const connectionString = "server=172.16.1.136;Database=ASM0103;Uid=Read_Only_ENG_MATRYCS;Pwd=MATRYCS2021!;Trusted_Connection=Yes;Driver={SQL Server}";
const query= "SELECT * FROM Runtime.dbo.IOSServerType";
//const query= "SELECT DateTime, Value from Runtime.dbo.History Where (Tagname='min_DB_ENM_001638.Cv') and (DateTime) >= '2022-07-01 00:00:00' and (DateTime) <'2022-08-01 00:00:00'";
sql.query(connectionString, query, (err, rows) => {
  console.log(rows);
  console.log(err);
})   */




/* 
const sql = require('msnodesqlv8');
const connectionString = "Driver={SQL Server Native Client 11.0};Server=172.16.1.136;Database=Asm0103;Uid=Read_Only_ENG_MATRYCS;Pwd=MATRYCS2021!;";
sql.open(connectionString, function (err, conn) {
  if (err) {
    console.error("Error opening the connection:", err);
    return;
  }
  console.log("Connected to SQL Server!");
  // Perform database operations here
  // Close the connection when finished
  conn.close(function (err) {
    if (err) {
      console.error("Error closing the connection:", err);
      return;
    }
    console.log("Connection closed.");
  });
}); */


/* 
const sql = require('msnodesqlv8');
const connectionString = 'Driver={SQL Server Native Client 11.0};Server=172.16.1.136;Database=Asm0103;Uid=Read_Only_ENG_MATRYCS;Pwd=MATRYCS2021!;';
sql.open(connectionString, (err, conn) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connection successful!');
    
    // Your code for executing queries or performing database operations
    const query ="SELECT * from db_datareader";
    conn.query(query, (err, results) => {
      if (err) {
        console.error('Query execution failed:', err);
      } else {
        console.log('Query results:', results);
      }
    });
    
    // Remember to close the connection when you're done
    conn.close((err) => {
      if (err) {
        console.error('Error closing connection:', err);
      } else {
        console.log('Connection closed.');
      }
    });
  }
});  */
/* app.post('/api/myEndpoint', (req, res) => {
  try {
    const value = req.body.value;

    // Fai qualcosa con la variabile ricevuta dal front-end

    // Invia una risposta al front-end
    res.send('Dati ricevuti con successo!');
    console.log(value)
  } catch (error) {
    // Gestisci l'errore di elaborazione
    res.status(500).send('Si è verificato un errore durante l\'elaborazione dei dati.');
  }
}); */


