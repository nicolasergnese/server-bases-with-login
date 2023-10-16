const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

/* router.get("/api/chartDateTimeForecasted", async (req, res) => {
    try {
        const authservice_session = 'MTY5MzIxODU1OHxOd3dBTkVSU1ZFMU1ORXBOTjA5TE5ESklRMHBPVTBKSFIwazNSRVZIVUZwR1RreGFXa2hQU2tGR1JFRk5VMFJKUVRSUVJrcERNMEU9fAnVRXZz540UQ2UJpEIkwn0Pi-VH5QAfkbSPwgzIdzqd';
        const url = 'http://ol-smart-grid-power-consumption.jmira.kserve.kf.iot-ngin.onelab.eu/v1/models/ol-smart-grid-power-consumption:predict';
        const headers = {
            'Content-Type': 'application/json',
            'Cookie': 'authservice_session=' + authservice_session,
        };
        const payload = {
            "service": "power-generation"
        };
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        console.log('Risposta:', data);
        return res.status(201).send(data);
    } catch (error) {
        console.error(error);
    }
}); */
let sensorIdValue = ''; // Dichiarazione globale di sensor

router.post('/api/sensorId', async (req, res) => { //collegamento per prendere i dati di power dal front-end per utilizzarle nella query
    try {
      sensorIdValue = req.body.sensor; // Update the variable name to "power" instead of "meter"
      // Do whatever you want with the power value
      console.log(`sensor id : ${sensorIdValue}`);
      // Send a response to the client
      res.json({ message: 'Power value received' });
      //getDataFromProtectedAPI();
    } catch (error) {
      // Handle any errors that may occur
      console.error(error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

router.get("/api/chartDateTimeForecasted", async (req, res) => {
    try {
        if (sensorIdValue === 'W4') {
        //const authservice_session = 'MTY5MzIxODU1OHxOd3dBTkVSU1ZFMU1ORXBOTjA5TE5ESklRMHBPVTBKSFIwazNSRVZIVUZwR1RreGFXa2hQU2tGR1JFRk5VMFJKUVRSUVJrcERNMEU9fAnVRXZz540UQ2UJpEIkwn0Pi-VH5QAfkbSPwgzIdzqd';
        const url = 'http://power-w4-uc-ten.jmira.kserve.kf.iot-ngin.onelab.eu/v1/models/power-w4-uc-ten:predict';
        const headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'authservice_session=MTY5NzQ0NTE4N3xOd3dBTkZoUlJsUkJVbFkyU0Vnek5VRTFXVUZPUWxOTFdUSkJWbFpJU0VGT05rcFlORVZWUzBNM1UweFlURmhWVlRJMVFUZFVRMUU9fKUg-benrb0DZhKfDwNHpzXkJB6PH7Lid7OTVBgQJVQk',
            'User-Agent': 'python-requests/2.22.0'
        };
        const payload = {};
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        //console.log('Risposta:', data);
        console.log('ris 2:', data.predictions.value)
        return res.status(201).send(data.predictions.value);
    } else if(sensorIdValue === 'W6') {
        //const authservice_session = 'MTY5MzIxODU1OHxOd3dBTkVSU1ZFMU1ORXBOTjA5TE5ESklRMHBPVTBKSFIwazNSRVZIVUZwR1RreGFXa2hQU2tGR1JFRk5VMFJKUVRSUVJrcERNMEU9fAnVRXZz540UQ2UJpEIkwn0Pi-VH5QAfkbSPwgzIdzqd';
        const url = 'http://power-w6-uc-ten.jmira.kserve.kf.iot-ngin.onelab.eu/v1/models/power-w6-uc-ten:predict';
        const headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'authservice_session=MTY5NzQ0NTE4N3xOd3dBTkZoUlJsUkJVbFkyU0Vnek5VRTFXVUZPUWxOTFdUSkJWbFpJU0VGT05rcFlORVZWUzBNM1UweFlURmhWVlRJMVFUZFVRMUU9fKUg-benrb0DZhKfDwNHpzXkJB6PH7Lid7OTVBgQJVQk',
            'User-Agent': 'python-requests/2.22.0'
        };
        const payload = {};
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        //console.log('Risposta:', data);
        console.log('ris 2:', data.predictions.value)
        return res.status(201).send(data.predictions.value);

    }
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
