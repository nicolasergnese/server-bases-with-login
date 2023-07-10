const express = require('express');
const router = express.Router();

//inizio codice per pagina NEW
let sensorIdValue = ''; // Dichiarazione globale di sensor
let serviceIdValue = ''; // Dichiarazione globale di sensor
let powerValueNew = ''; // Dichiarazione globale di powerValue
let dateStartNew = ''; // Dichiarazione globale di datestart
let dateEndNew = ''; // Dichiarazione globale di dateend


/* router.post('/api/sensorId', async (req, res) => {
  try {
    const sensorIdValue = req.body.sensor;
    // Fai ciò che desideri con il valore del sensore
    console.log(`Sensor value: ${sensorIdValue}`);
    // Invia una risposta al client
    res.json({ message: 'Sensor value received' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}); */

router.post('/api/sensorIdAndserviceId', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
    try {
        const sensorNew = req.body.sensor; // Update the variable name to "power" instead of "meter"
        serviceIdValue = req.body.serviceId;

        // Do whatever you want with the power value
        console.log(`Power value: ${sensorNew}`);
        console.log(`Power value: ${serviceIdValue}`);

        // Send a response to the client
        res.json({ message: 'Power value received' });
    } catch (error) {
        // Handle any errors that may occur
        console.error(error);
        res.status(500).json({ message: 'An error occurred' });
    }
});
/*
app.post('/api/powernew', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
  try {
    powerValueNew = req.body.power; // Update the variable name to "power" instead of "meter"
 
    // Do whatever you want with the power value
    console.log(`Power value: ${powerValueNew}`);
 
    // Send a response to the client
    res.json({ message: 'Power value received' });
  } catch (error) {
    // Handle any errors that may occur
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});
 
// Gestione della richiesta POST per la data
app.post('/api/datetimestartnew', (req, res) => { //collegamento per prendere le date inizali dai DateAndTimestart  dal front-end per utilizzarle nella query
  dateStartNew = req.body.datestart;
  console.log(`date start: ${dateStartNew}`);
  // Esegui le operazioni necessarie con la data (es. salvataggio nel database)
  // Invia una risposta di conferma al front end
  res.json({ message: 'Data received successfully' });
});
 
 
// Gestione della richiesta POST per la data
app.post('/api/datetimeendnew', (req, res) => { //collegamento per prendere le date finali dai DateAndTimeend dal front-end per utilizzarle nella query
  dateEndNew = req.body.dateend;
  // Esegui le operazioni necessarie con la data (es. salvataggio nel database)
  // Invia una risposta di conferma al front end
  console.log(`date end: ${dateEndNew}`);
  res.json({ message: 'Data received successfully' });
});
 
 
const Keycloak = require('keycloak-connect').Keycloak;
 
const keycloak = new Keycloak({
  "realm": "iot-ngin",
  "keycloak_base_url": "http://172.16.1.9:31757",
  "client_id": "access-control",
  "username": "iot-ngin-user",
  "password": "StrOngpwd!",
  "is_legacy_endpoint": false
});
 
app.get("/api/chartDateTimenew", async (req, res) => { //esecuzione della query con i dati presi dal front-end
  const accessToken = await keycloak.accessToken.get();//metodo libreria react
  try {
    //urltoken = "{}/device-indexing/get_measurements/BBB6150/2023-07-03 13:55:19.988316/2023-07-04 13:55:19.988316";
    urltoken = `{}/device-indexing/get_measurements/${sensorIdValue}/${serviceIdValue}/${dateStartNew}/${dateEndNew}`
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

/* 
const fetch = require('node-fetch');
const Keycloak = require('keycloak-connect').Keycloak;
 
const keycloak = new Keycloak({
  "realm": "iot-ngin",
  "keycloak_base_url": "http://172.16.1.9:31757",
  "client_id": "access-control",
  "username": "iot-ngin-user",
  "password": "StrOngpwd!",
  "is_legacy_endpoint": false
});
 
 
async function fetchData() {
  const accessToken = await keycloak.accessToken.get();//metodo libreria react
  try {
    //urltoken = "{}/device-indexing/get_measurements/BBB6150/2023-07-03 13:55:19.988316/2023-07-04 13:55:19.988316";
    urltoken = `{}/device-indexing/get_measurements/${sensorNew}/${dateStartNew}/${dateEndNew}`
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
}
fetchData();
//fine codice mqtt */
//fine codice per la pagina NEW
module.exports = router;