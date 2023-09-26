const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


let numberStep = 0;

router.post("/api/numberStep", async (req, res) => {
    try {
        numberStep = req.body.numberStep;
        console.log(numberStep)
        res.json({ message: 'Power value received' });
    } catch (error) {
        console.error(error);
    }
});

const apiUrl = 'http://rl-smart-optimizer.jmira.kserve.kf.iot-ngin.onelab.eu:80/v1/models/rl-optimizer:predict';


router.get("/api/chartDateTimeHome", async (req, res) => {
    try {
        const requestData = {
            number_steps: numberStep,
            state_index: -numberStep
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'authservice_session=MTY5NTY1NDgxOHxOd3dBTkV4WVVFRkROVkZaTjFaUFdETkRXbHBVUjA4MU5GTklNak5TUWxkVVJrYzFSRmhPU1RRME0xSkpUak5ETlU0M1J6VlhNMUU9fOwwJrPQboAO9bkthLXzLCe7kvIGhqDm7MOebi8v74Yp',
                'User-Agent': 'python-requests/2.22.0'
            },
            body: JSON.stringify(requestData)
        };
        console.log(requestData.number_steps);
        console.log(requestData.state_index);
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        console.log('Response data:', data);
        const kpis = data.state_requested.kpis
        return res.status(201).send(kpis);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
