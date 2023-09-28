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
            //state_index: 0
            state_index: -numberStep
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'authservice_session=MTY5NTc0MzI2MXxOd3dBTkRkV05VSmFRa05EVWtGSU5WcFZXRGN6VDBOSVJFRXpORkEwTkU5RldWbElSREpKUWxOR1VVazNRakpaVmxkSU56VlZTVkU9fEe6hTw-VznCFI_FPtWwM96qbvQd1xKM43Pcb9bKaXHV',
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
        console.log(kpis)
        return res.status(201).send(kpis);
    } catch (error) {
        console.error(error);
    }
});

router.get("/api/chartDateTimeHome2", async (req, res) => {
    try {
        const requestData2 = {
            number_steps: 0,
            state_index: -1
        };
        const requestOptions2 = {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Accept-Encoding': 'gzip, deflate',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': 'authservice_session=MTY5NTc0MzI2MXxOd3dBTkRkV05VSmFRa05EVWtGSU5WcFZXRGN6VDBOSVJFRXpORkEwTkU5RldWbElSREpKUWxOR1VVazNRakpaVmxkSU56VlZTVkU9fEe6hTw-VznCFI_FPtWwM96qbvQd1xKM43Pcb9bKaXHV',
                'User-Agent': 'python-requests/2.22.0'
            },
            body: JSON.stringify(requestData2)
        };
        console.log(requestData2.number_steps);
        console.log(requestData2.state_index);
        const response = await fetch(apiUrl, requestOptions2);
        const data = await response.json();
        console.log('Response data 2:', data);
        const kpis2 = data.state_requested.kpis
        console.log(kpis2)
        return res.status(201).send(kpis2);
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;
