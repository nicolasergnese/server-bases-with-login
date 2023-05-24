require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const chartRoutes = require('./routes/chart');//collegamento api chart

const offersRoutes = require('./routes/offers'); //collegamento api offers


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
//app.use("/api/offers", offersRoutes) //collegamento api per tabella offers


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
    database: 'History',
    options: {
      encrypt: false // Use this if you're connecting to Azure SQL Database with true
    }
};
async function connect() {
    try {
        await sql.connect(config);
        console.log('Connected to MSSQL');
    } catch (err) {
        console.error(err);
    }
}
connect();    */


/*const sql = require('mssql') //questa presa direttamnte da npm,va direttamnetein catch non so il perchè
async function connect() {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=172.16.1.136,1433;Database=Asm0103;User Id=Read_Only_ENG_MATRYCS;Password=MATRYCS2021!;Encrypt=false')
        //const result = await sql.query`select * from mytable where id = ${value}`
        console.log('Connected to MSSQL')
    } catch (err) {
      console.log(' NOT connected to MSSQL')
        // ... error checks
    }
}
connect(); */



/* const sql = require("msnodesqlv8") //qui mi da credenziali errate, anche se la query è errata
const connectionString = "server=172.16.1.136;Database=ASM0103;Uid=Read_Only_ENG_MATRYCS;Pwd=MATRYCS2021!;Trusted_Connection=Yes;Driver={SQL Server}";
const query= "SELECT * FROM Runtime.dbo.IOSServerType";
//const query= "SELECT DateTime, Value from Runtime.db0.History Where (Tagname='min_DB_ENM_001638.Cv') and (DateTime) >= '2022-07-01 00:00:00' and (DateTime) <'2022-08-01 00:00:00'";
sql.query(connectionString, query, (err, rows) => {
  console.log(rows);
  console.log(err);
})   */


/* const sql = require('msnodesqlv8');
var dbConfig = {
    connectionTimeout : 30000,
    database: "<Asm0103>",
    server: "<172.16.1.136>",
    options: {
        trustedConnection: true,
    }
};
var dbConfig2 = {
    connectionTimeout : 30000,
    connectionString: 'Driver={SQL Server Native Client 11.0};Server=<172.16.1.136>;Database=<Asm0103>;Trusted_Connection=yes;',
    options: {
        
    }
};
async function connect() {
    try {
        console.log("start");
        await sql.connect(dbConfig);  // both format of dbConfig or dbConfig2 will work
        const result = await sql.query(`select SYSDATETIME() as dt `);
        console.dir(result.recordset);
        console.log("end");
    } catch (err) {
        // 
        console.log(err);
    } finally {
        //
    }
};
connect(); */


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



/*
 const mysql = require('mysql'); //con mysql mi da questo errore: connect ECONNREFUSED 172.16.1.136:3306

const connection = mysql.createConnection({ //connessione dati sql
   host: '172.16.1.136',
   user: 'Read_Only_ENG_MATRYCS',
   password: 'MATRYCS2021!',
   database: 'Asm0103',
});
connection.connect((err) => {
 if (err) {
   console.error('Error connecting to MySQL database: ' + err.stack);
   return;
 }
 console.log('Connected to MySQL database with id ' + connection.threadId);
});
connection.connect(function(err) {
   if (err) throw err;
   console.log("Connected!");
   //Insert a record in the "customers" table:
   //var sql = "INSERT INTO impiegati (impiegato_nome, azienda) VALUES ('Gianmarco', 'Eng')"; //query per inserire dato nel database sql
   //connection.query(sql, function (err, result) { //funzione che invia la query
     if (err) throw err; //se c'è errore
     console.log("1 record inserted");
   });
 //});    */

/* var Connection = require('tedious').Connection;  //questo è un ltro metodo con tedious, qui mi da errore di Unexpected token '??=', ma non so dove

var config = {
  server: "172.16.1.136", // or "localhost"
  options: {},
  authentication: {
    type: "default",
    options: {  
      userName: "Read_Only_ENG_MATRYCS",
      password: "MATRYCS2021!",
  }},
  options:{
    encrypt: true,
    database: 'ASM0103'
  }
};

var connection = new Connection(config);

// Setup event handler when the connection is established. 
connection.on('connect', function(err) {
    console.log('prova')
});

// Initialize the connection.
connection.connect(); */


/* 
 const tedious = require('tedious');//questo è un ltro metodo con tedious, qui mi da errore di Unexpected token '??=', ma non so dove

    const config = {
      server: '172.16.1.136',
      authentication: {
        type: 'default',
        options: {
          userName: 'Read_Only_ENG',
          password: 'MATRYCS2021!',
        },
      },
      options: {
        database: 'Asm0103',
        encrypt: false, // Use SSL encryption (optional)
      },
    };
    
    const connection = new tedious.Connection(config);

    connection.on('connect', (err) => {
      if (err) {
        console.error('Errore di connessione al database: ' + err.message);
      } else {
        console.log('Connesso al database SQL Server');
        // Puoi eseguire query o altre operazioni qui
      }
    });
  

// Avvia la connessione al database
connection.connect(); */

/*     const { Pool } = require('pg');  //connessione con postgres, mi da questo errore:Error connecting to PostgreSQL database: Error: Connection terminated unexpectedly
    const pool = new Pool({
      user: 'Read_Only_ENG_MATRYCS',
      host: '172.16.1.136',
      database: 'Asm0103',
      password: 'MATRYCS2021!',
      port: 1433,
    });
    pool.connect((err, client, release) => {
      if (err) {
        console.error('Error connecting to PostgreSQL database: ' + err.stack);
        return;
      }
    
      console.log('Connected to PostgreSQL database with process id ' + client.processID);
    
      release();
    }); */