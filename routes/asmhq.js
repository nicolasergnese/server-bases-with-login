const express = require('express');
const router = express.Router();

const sql = require('mssql'); //libreria mssql

let powerValue = ''; // Dichiarazione globale di powerValue
let datestart = ''; // Dichiarazione globale di datestart
let dateend = ''; // Dichiarazione globale di dateend

router.post('/api/powerDateStartAndDateEnd', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
  try {
    powerValue = req.body.power; // Update the variable name to "power" instead of "meter"
    datestart = req.body.formattedDateStart;
    dateend = req.body.formattedDateEnd;
    // Do whatever you want with the power value
    //console.log(`Power value: ${powerValue}`);
    //console.log(`date start: ${datestart}`);
    //console.log(`date end: ${dateend}`);
    // Send a response to the client
    res.json({ message: 'Power value received' });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});

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

router.get("/api/chartDateTime", async (req, res) => { //esecuzione della query con i dati presi dal front-end
  try {
    //console.log(`date end: ${dateend}`);
    //console.log(datestart);
    //console.log(dateend);
    const result = await executeSQLQuery(`
    EXEC [dbo].[SP_RECUPERA_DATI_STORICI_ENERGIA] 
        @TAGNAME = '${powerValue}' ,
        @DATA_INIZIO = '${datestart}' ,
        @DATA_FINE = '${dateend}'
    `);
    console.log(result)
    sql.close();
    //console.log('finito');
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
