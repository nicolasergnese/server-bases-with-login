const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get("/api/chartDateTimeForecasted", async (req, res) => {
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
});


module.exports = router;
