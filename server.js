require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


const newRoutes = require('./routes/new') //utilizzo i servizi della pagina new, mqtt
const asmhqRoutes = require('./routes/asmhq') //utilizzo i servizi della pagina ASMHQ, mssql
const dsoRoutes = require('./routes/dso') //utilizzo i servizi della pagina DSO, decreto il vincitore

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
//app.use(newRoutes); //utilizzo i servizi per la pagina new, mqtt
app.use(asmhqRoutes); //utilizzo i servizi per la pagina ASMHQ, mssql
app.use(dsoRoutes); //utilizzo i servizi per la pagina DSO, vincitore di una request


// index.js
const fetch = require('node-fetch');

//inizio codice per pagina NEW
let sensorIdValue = ''; // Dichiarazione globale di sensor
let serviceIdValue = ''; // Dichiarazione globale di sensor
let dateStartNew = ''; // Dichiarazione globale di datestart
let dateEndNew = ''; // Dichiarazione globale di dateend


app.post('/api/sensorIdServiceIdDateStartAndDateend', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
  try {
    sensorIdValue = req.body.sensor; // Update the variable name to "power" instead of "meter"
    serviceIdValue = req.body.serviceId;
    dateStartNew = req.body.formattedDateStart;
    dateEndNew = req.body.formattedDateEnd;
    // Do whatever you want with the power value
    console.log(`sensor id : ${sensorIdValue}`);
    console.log(`ervice id: ${serviceIdValue}`);
    console.log(`date start: ${dateStartNew}`);
    console.log(`date end: ${dateEndNew}`);
    // Send a response to the client
    res.json({ message: 'Power value received' });
    //getDataFromProtectedAPI();
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



// Configura le credenziali client fornite da Keycloak
const keycloakClientCredentials = {
  clientId: 'access-control',
  clientSecret: 'C67e5kVTzVzQbWEGn1CD6faPPw4x7o0K',
  tokenUrl: 'http://172.16.1.9:31757/realms/iot-ngin/protocol/openid-connect/token',
};


// Funzione per ottenere un token di accesso utilizzando le credenziali client
const getAccessToken = async () => {
  try {
    const response = await fetch(keycloakClientCredentials.tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${keycloakClientCredentials.clientId}&client_secret=${keycloakClientCredentials.clientSecret}`,
    });
    if (!response.ok) {
      const errorResponse = await response.json();
      console.log('Error response from Keycloak:', errorResponse);
      throw new Error('Failed to obtain access token');
    }
    const data = await response.json();
    console.log('Access token:', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};


// Esempio di utilizzo per ottenere dati dall'API protetta
const getDataFromProtectedAPI = async () => {
  try {
    const accessToken = await getAccessToken();
    console.log(' 2 Access token:', accessToken);
    const startDate = '2023-07-21 22:48:08.556621';
const endDate = '2023-07-21 23:38:30.441841';
//const encodedStartDate = encodeURIComponent(startDate);
//const encodedEndDate = encodeURIComponent(endDate);

const apiUrl = `http://172.16.1.9:30631/device-indexing/get_measurements/BBB6154/1/${startDate}/${endDate}`;
//const apiUrl = `http://172.16.1.9:31000/get_measurements/BBB6154/1/${startDate}/${endDate}`; //con questo url mi fornisce i dati, ma non utilizzo il token
console.log("apiurl", apiUrl)
    //const apiUrl = 'http://172.16.1.9:30631/device-indexing/get_measurements/BBB6152/1/${datestart}/${dateEndNew}'
    // Sostituisci con l'URL dell'API protetta
    const response = await fetch(apiUrl, {
      headers: {
        'Fiware-Service': 'energy',
        'Fiware-ServicePath': '/',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response)
    const data = await response.json();
    console.log(data); // Dati ricevuti dall'API
  } catch (error) {
    console.error(error);
  }
};
getDataFromProtectedAPI();
 


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

