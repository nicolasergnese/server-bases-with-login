require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

const fetch = require('node-fetch');

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

//inizio codice per pagina ASM HQ
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
  dateend = req.body.dateend;
  // Esegui le operazioni necessarie con la data (es. salvataggio nel database)
  // Invia una risposta di conferma al front end
  console.log(`date end: ${dateend}`);
  res.json({ message: 'Data received successfully' });
});


const sql = require('mssql'); //libreria mssql
const { boolean } = require('joi');

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
    EXEC [dbo].[SP_RECUPERA_DATI_STORICI_ENERGIA] 
        @TAGNAME = '${powerValue}' ,
        @DATA_INIZIO = '${datestart}' ,
        @DATA_FINE = '${dateend}'
    `);
    console.log(result)
    sql.close();
    console.log('finito');
    return res.status(201).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});
//fine codice per la pagina ASM HQ


//inizio codice per la pagina DSO DASHBOARD
let id = ''; // Dichiarazione globale di ID
//let author ='';
let isFirstAPIExecuted = false; // Variabile booleana per tenere traccia dell'esecuzione della prima API

app.get("/api/tablerequeststart", async (req, res) => { //qui prendo i risultati del fetch e li mando al front-end per la tabella request
  try {
    const response = await fetch("https://emotion-projects.eu/marketplace/request");
    const responseDataDSO = await response.json();
    console.log("The result is:", responseDataDSO);
    console.log(isFirstAPIExecuted)
    return res.status(201).send(responseDataDSO);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

const sendDataEndExtraRequestIdToBackend = async (dateendDSO, datestartDSO, energyValueDSO, Requestid) => { //qui ci sono le tre api di asm
  console.log(energyValueDSO);
  try {
    const firstApiPayload = {
      deadline: dateendDSO,
    };

    const response = await fetch("https://emotion-projects.eu/marketplace/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(firstApiPayload),
    });

    console.log("First API call response: done");

    //const response = await fetch("https://emotion-projects.eu/marketplace/request");
    const responseIDDSO = await response.json();
    //const requestIdArray = responseDataDSO.requests;
    console.log("Response from GET request responsdataDso:", responseIDDSO);
    id = responseIDDSO.id;
    console.log("ID:", id);

    const secondApiPayload = {
      extra: [parseInt(energyValueDSO), datestartDSO],
      request_id: id,
    };
    console.log('id seconda api:', id)
    console.log('energy seconda api:', parseInt(energyValueDSO))
    console.log('date seconda api:', datestartDSO)

    await fetch("https://emotion-projects.eu/marketplace/request/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(secondApiPayload),
    });
    console.log(secondApiPayload)
     isFirstAPIExecuted = true;
     console.log('ciao')

    console.log("Third API call response: done");
    console.log(id)
  } catch (error) {
    console.error("Error during API calls:", error);
  }
};

app.post("/api/dataenergyvalue", async (req, res) => {//qui prendo i valori di energia, e delle date di inizio e fine
  const dateendDSO = req.body.dateend;
  const datestartDSO = req.body.datestart;
  const energyValueDSO = req.body.energyvalue;
  try {
    await sendDataEndExtraRequestIdToBackend(dateendDSO, datestartDSO, energyValueDSO, id); //prendendo i dati della request, applico la funzione sopra
    //getWinningOffer(id);
    console.log('sendata:', dateendDSO)
    console.log(datestartDSO)
    console.log(energyValueDSO)
    console.log(id)
    res.json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error during API calls:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/tablerequest", async (req, res) => { //qui prendo i risultati del fetch e li mando al front-end per la tabella request
  try {
    if (isFirstAPIExecuted) { 
    const response = await fetch("https://emotion-projects.eu/marketplace/request");
    const responseDataDSO = await response.json();
    console.log("The result is:", responseDataDSO);
    console.log(isFirstAPIExecuted)
    return res.status(201).send(responseDataDSO);
    } else {
      return res.status(400).send("First API not executed");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

let IDRequest = '';
app.post("/api/IDRequestForOffers", async (req, res) => {//qui prendo i valori di energia, e delle date di inizio e fine
  try {
    IDRequest = req.body.id;
    console.log('sendata:', IDRequest)
    res.json({ message: "Data received successfully" });
  } catch (error) {
    console.error("Error during API calls:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/carddetails", async (req, res) => { //qui prendo i risultati del fetch e li mando al front-end per la tabella request
  try {
    console.log('IDREQUEST:',IDRequest)
    const urlApiCard = `https://emotion-projects.eu/marketplace/request/${IDRequest}`;
    const responseCard = await fetch(urlApiCard);
    const responseCardDSO = await responseCard.json();
    console.log("The result card is:", responseCardDSO);

    return res.status(201).send(responseCardDSO);

  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

app.get('/api/offers', async (req, res) => {
  try {
    //console.log('getwinni', IDRequest)
    const urlApi = `https://emotion-projects.eu/marketplace/offer?request=${IDRequest}`;
    //const urlApi = `https://emotion-projects.eu/marketplace/offer?request=1`;
    const response = await fetch(urlApi);
    //console.log('apiOffers', response)
    const dataOffer = await response.json();
    //console.log('apiOffers', dataOffer)
    const extraValues = [];
    const IDValues = [];
    const dataToSendToFrontEnd = [];
    dataOffer.offers.forEach(offer => {
      const IDValue = offer.id;
      const author = offer.author
      const extraValue = offer.extra;
      extraValues.push(extraValue);
      IDValues.push(IDValue);
      const offerData = {
        author: author,
        idValue: IDValue,
        extraValue: extraValue
      };
      dataToSendToFrontEnd.push(offerData)
    });
    //console.log('winne', dataToSendToFrontEnd);
    res.json({
      dataOffer: dataToSendToFrontEnd,
      winnerID: getWinnerID(extraValues, IDValues),
      minExtraValue: getMinExtraValue(extraValues)
    });
    // Second PUT request payload
     const secondApiPayload = {
      state: "decided",
      decision: [{"id": winnerID}],
      //decision: [{ id: 3 }]
    }; 

     // Second PUT request
    const urlApi2 = `https://emotion-projects.eu/marketplace/offer?request=${IDRequest}`;
    const secondResponse = await fetch(urlApi2, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(secondApiPayload),
    });
    const responseData = await secondResponse.json();
    console.log("Response from second PUT request:", responseData);
 
    // Handle the response data from the second PUT request here   
  } catch (error) {
    console.error("Error:", error);
    // Handle the error here
  }
});
function getWinnerID(extraValues, IDValues) {
  const minExtraValue = getMinExtraValue(extraValues);
  const indexMinValue = extraValues.indexOf(minExtraValue);
  return IDValues[indexMinValue];
}

function getMinExtraValue(extraValues) {
  return extraValues.reduce((minValue, currentValue) => {
    if (currentValue < minValue) {
      return currentValue;
    }
    return minValue;
  })};
//fine codice per la pagina DSO DASHBOARD



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

