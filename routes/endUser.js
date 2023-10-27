const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//inizio codice per pagina NEW
let sensorIdValue = ''; // Dichiarazione globale di sensor
let serviceIdValue = ''; // Dichiarazione globale di sensor
let dateStartNew = ''; // Dichiarazione globale di datestart
let dateEndNew = ''; // Dichiarazione globale di dateend

router.post('/api/sensorIdServiceIdDateStartAndDateend', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
  try {
    sensorIdValue = req.body.sensor; // Update the variable name to "power" instead of "meter"
    serviceIdValue = req.body.serviceId;
    dateStartNew = req.body.formattedDateStart;
    dateEndNew = req.body.formattedDateEnd;
    // Do whatever you want with the power value
    //console.log(`sensor id : ${sensorIdValue}`);
    //console.log(`ervice id: ${serviceIdValue}`);
    //console.log(`date start: ${dateStartNew}`);
    //console.log(`date end: ${dateEndNew}`);
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
    //console.log('Access token:', data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};

const { format, parseISO } = require('date-fns');

router.get("/api/chartDateTimeNewEnergiot", async (req, res) => { //esecuzione della query con i dati presi dal front-end
  try {
    const accessToken = await getAccessToken();
    //console.log(' 2 Access token:', accessToken);
    // Formattare le date nel formato desiderato
    const dateStart = parseISO(dateStartNew);
    const dateEnd = parseISO(dateEndNew);
    const formattedStart = format(dateStart, 'yyyy-MM-dd HH:mm:ss.SSSSSS');
    const formattedEnd = format(dateEnd, 'yyyy-MM-dd HH:mm:ss.SSSSSS');
    //console.log("Formatted Start:", formattedStart);
    //console.log("Formatted End:", formattedEnd);
    const apiUrl = `http://172.16.1.9:30631/device-indexing/get_measurements/${sensorIdValue}/${serviceIdValue}/${formattedStart}/${formattedEnd}`;
    //console.log("apiurl", apiUrl)
    //console.log(`sensor id : ${sensorIdValue}`);
    //console.log(`ervice id: ${serviceIdValue}`);
    //console.log(`date start: ${formattedStart}`);
    //console.log(`date end: ${formattedEnd}`);
    const response = await fetch(apiUrl, {
      headers: {
        'Fiware-Service': 'energy',
        'Fiware-ServicePath': '/',
        'token': accessToken, //tipi di token, io usavo authotìrized
      },
    });
    const data = await response.json();
    //console.log(data); // Dati ricevuti dall'API
    return res.status(201).send(data);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;