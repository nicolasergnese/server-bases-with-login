const express = require('express');
const router = express.Router();


const fetch = require('node-fetch');
//const Keycloak = require('keycloak-connect').Keycloak;

//inizio codice per pagina NEW
let sensorIdValue = ''; // Dichiarazione globale di sensor
let serviceIdValue = ''; // Dichiarazione globale di sensor
let dateStartNew = ''; // Dichiarazione globale di datestart
let dateEndNew = ''; // Dichiarazione globale di dateend


router.post('/api/sensorIdServiceIdDateStartAndDateend', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
    try {
        sensorIdValue= req.body.sensor; // Update the variable name to "power" instead of "meter"
        serviceIdValue = req.body.serviceId;
        dateStartNew = req.body.formattedDateStart;
        dateEndNew = req.body.formattedDateEnd;
        // Do whatever you want with the power value
      /*   console.log(`Power value: ${sensorIdValue}`);
        console.log(`Power value: ${serviceIdValue}`);
        console.log(`Power value: ${dateStartNew}`);
        console.log(`Power value: ${dateEndNew}`); */
        // Send a response to the client
        res.json({ message: 'Power value received' });
    } catch (error) {
        // Handle any errors that may occur
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
/* 
const keycloakConfig = require('./keycloak.json');
const keycloak = require('keycloak-connect')(keycloakConfig);

keycloak.init({ config: keycloakConfig });

app.get("/api/chartDateTimeNew", keycloak.protect(), async (req, res) => {
  try {
    const accessToken = await keycloak.accessToken.get();
    console.log(`sensor id: ${sensorIdValue}`);
    console.log(`service id: ${serviceIdValue}`);
    console.log(`start date: ${dateStartNew}`);
    console.log(`end date: ${dateEndNew}`);
    const urltoken = `/device-indexing/get_measurements/${sensorIdValue}/${serviceIdValue}/${dateStartNew}/${dateEndNew}`;
    const response = await fetch(urltoken, {
      headers: {
        'Fiware-Service': 'energy',
        'Fiware-ServicePath': '/',
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Errore nella richiesta:', response.status);
    }
  } catch (error) {
    console.error(error);
  }
});
 */

/* const keycloakConfig = require('./keycloak.json');
const keycloak = require('keycloak-connect')(keycloakConfig);

keycloak.init({ config: keycloakConfig });

app.get("/api/chartDateTimeNew", keycloak.protect(), async (req, res) => {
  try {
    const accessToken = await keycloak.accessToken.get();
    console.log(`sensor id: ${sensorIdValue}`);
    console.log(`service id: ${serviceIdValue}`);
    console.log(`start date: ${dateStartNew}`);
    console.log(`end date: ${dateEndNew}`);
    const urltoken = `/device-indexing/get_measurements/${sensorIdValue}/${serviceIdValue}/${dateStartNew}/${dateEndNew}`;
    const response = await fetch(urltoken, {
      headers: {
        'Fiware-Service': 'energy',
        'Fiware-ServicePath': '/',
        Authorization: `Bearer ${accessToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      console.error('Errore nella richiesta:', response.status);
    }
  } catch (error) {
    console.error(error);
  }
}); */

 
/* const keycloak = require('keycloak-connect')({
  "realm": "iot-ngin",
  "keycloak_base_url": "http://172.16.1.9:31757",
  "client_id": "access-control",
  "username": "iot-ngin-user",
  "password": "StrOngpwd!",
  "is_legacy_endpoint": false
});

app.get("/api/chartDateTimeNew",keycloak.protect(), async (req, res) => { //esecuzione della query con i dati presi dal front-end
  const accessToken = await keycloak.accessToken.get();//metodo libreria react
  try {
    console.log(`sensor id: ${sensorIdValue}`);
        console.log(`service id: ${serviceIdValue}`);
        console.log(`start date: ${dateStartNew}`);
        console.log(`end date: ${dateEndNew}`);
    //urltoken = "{}/device-indexing/get_measurements/BBB6150/2023-07-03 13:55:19.988316/2023-07-04 13:55:19.988316";
    urltoken = `/device-indexing/get_measurements/${sensorIdValue}/${serviceIdValue}/${dateStartNew}/${dateEndNew}`
    //urltoken = `{}/device-indexing/get_measurements/${sensorIdValue}/${serviceIdValue}/${dateStartNew}/${dateEndNew}`
    const response = await fetch(urltoken, {
      headers: {
        'Fiware-Service': 'energy', //ce li ha messi lei
        'Fiware-ServicePath': '/', //ce li ha messi lei
        Authorization: `Bearer ${accessToken}`
      }
    });
    // Verifica lo stato della risposta
    if (response.ok) {
      const data = await response.json();
      // Fai qualcosa con i dati della risposta
      console.log(data);
    } else {
      console.error('Errore nella richiesta:', response.status);
    }
  } catch (error) {
    console.error(error);
  }
}); */

module.exports = router;