require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

//const chartRoutes = require('./routes/chart');//collegamento api chart Value

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

 //app.use("/api/chart", chartRoutes);//collegamento api chart, non lo riesco a collegare

 
let powerValue = ''; // Dichiarazione globale di powerValue
let datestart = ''; // Dichiarazione globale di datestart
let dateend = ''; // Dichiarazione globale di dateend

app.post('/api/power', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
  try {
    powerValue = req.body.power; // Update the variable name to "power" instead of "meter"
  
    // Do whatever you want with the power value
    console.log(`Power value: ${powerValue}`);
  
    // Send a response to the client
    res.json({ message: 'Power value received' });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
 
// Gestione della richiesta POST per la data
app.post('/api/datetimestart', (req, res) => { //collegamento per prendere le date inizali dai DateAndTimestart  dal front-end per utilizzarle nella query
  datestart = req.body.datestart;
  console.log(`date start: ${datestart}`);
  // Esegui le operazioni necessarie con la data (es. salvataggio nel database)
  // Invia una risposta di conferma al front end
  res.json({ message: 'Data received successfully' });
});


// Gestione della richiesta POST per la data
app.post('/api/datetimeend', (req, res) => { //collegamento per prendere le date finali dai DateAndTimeend dal front-end per utilizzarle nella query
  dateend  = req.body.dateend;
  // Esegui le operazioni necessarie con la data (es. salvataggio nel database)
  // Invia una risposta di conferma al front end
  console.log(`date end: ${dateend}`);
  res.json({ message: 'Data received successfully' });
});


const sql = require('mssql'); //libreria mssql

const config = { //credenziali di accesso di mssql
  user: 'Read_Only_ENG_MATRYCS',
  password: 'MATRYCS2021!',
  server: '172.16.1.136',
  database: 'Runtime',
  options: {
    encrypt: false
  }
};

async function executeSQLQuery(query) { //funzione generica per eseguire una query per risolvere il problema di sincronizzazione dei dati
  await sql.connect(config);
  const result = await sql.query(query);
  sql.close();
  return result.recordset;
}

app.get("/api/chartDateTime", async (req, res) => { //esecuzione della query con i dati presi dal front-end
  try {
    console.log(`date end: ${dateend}`);
    console.log(datestart);
    console.log(dateend); 
    const result = await executeSQLQuery(`
      SELECT DateTime, Value
      FROM dbo.History
      WHERE tagName = '${powerValue}'
      AND DateTime between '${datestart}'
      AND  '${dateend}'
    `);  
    sql.close();
    console.log('finito');
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

