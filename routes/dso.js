const express = require('express');
const router = express.Router();

const fetch = require('node-fetch');


//inizio codice per la pagina DSO DASHBOARD
let id = ''; // Dichiarazione globale di ID
//let author ='';
let isFirstAPIExecuted = false; // Variabile booleana per tenere traccia dell'esecuzione della prima API

router.get("/api/tablerequeststart", async (req, res) => { //qui prendo i risultati del fetch e li mando al front-end per la tabella request
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

router.post("/api/dataenergyvalue", async (req, res) => {//qui prendo i valori di energia, e delle date di inizio e fine
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

router.get("/api/tablerequest", async (req, res) => { //qui prendo i risultati del fetch e li mando al front-end per la tabella request
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
router.post("/api/IDRequestForOffers", async (req, res) => {//qui prendo i valori di energia, e delle date di inizio e fine
    try {
        IDRequest = req.body.id;
        console.log('sendata:', IDRequest)
        res.json({ message: "Data received successfully" });
    } catch (error) {
        console.error("Error during API calls:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/api/carddetails", async (req, res) => { //qui prendo i risultati del fetch e li mando al front-end per la tabella request
    try {
        console.log('IDREQUEST:', IDRequest)
        const urlApiCard = `https://emotion-projects.eu/marketplace/request/${IDRequest}`;
        const responseCard = await fetch(urlApiCard);
        const responseCardDSO = await responseCard.json();
        console.log("The result card is:", responseCardDSO);
        // Accedi direttamente alla data di scadenza
        const deadline = responseCardDSO.deadline;
        console.log("deadline:", deadline);
        return res.status(201).send(responseCardDSO);
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get('/api/offers', async (req, res) => { //funzione per riempire la tabella offers
    try {
        console.log('getwinni', IDRequest)
        const urlApi = `https://emotion-projects.eu/marketplace/offer?request=${IDRequest}`;
        //const urlApi = `https://emotion-projects.eu/marketplace/offer?request=1`;
        const response = await fetch(urlApi);
        //console.log('apiOffers', response)
        const dataOffer = await response.json();
        console.log('apiOffers', dataOffer)
        const extraValues = [];
        const IDValues = [];
        const dataToSendToFrontEnd = [];
        console.log('ciao', dataOffer)
        const nonEmptyOffers = dataOffer.offers.filter(offer => Object.keys(offer).length > 0);//questo filtro lo uso per levare offerte nulle che mi danno problemi per calcolare il prezzo minimo
        console.log('empty', nonEmptyOffers);
        nonEmptyOffers.forEach(offer => {//ciclo ogni offerta
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
        console.log('valori', extraValues)
        //console.log('winne', dataToSendToFrontEnd);
        console.log('winnerID', getWinnerID(extraValues, IDValues))
        console.log('minextravalue', getMinExtraValue(extraValues))
        res.json({
            dataOffer: dataToSendToFrontEnd,
            winnerID: getWinnerID(extraValues, IDValues),
            minExtraValue: getMinExtraValue(extraValues)
        });
        console.log(getWinnerID(extraValues, IDValues))
        const value1 = "decided";
        const value2 = [{ "id": getWinnerID(extraValues, IDValues) }];
        console.log('put', value1)
        console.log(value2)
        // Second PUT request payload
        const secondApiPayload = {
            state: value1,
            decision: value2,
            //decision: [{ id: 3 }]
        };
        // Second PUT request
        console.log('put', IDRequest)
        const urlApi2 = `https://emotion-projects.eu/marketplace/request/${IDRequest}`;
        const secondResponse = await fetch(urlApi2, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(secondApiPayload),
        });
        console.log("Response from second PUT request done");
        // Handle the response data from the second PUT request here   
    } catch (error) {
        console.error("Error:", error);
        // Handle the error here
    }
});

function getWinnerID(extraValues, IDValues) { //per prendere id vincente
    const minExtraValue = getMinExtraValue(extraValues);
    const indexMinValue = extraValues.indexOf(minExtraValue);
    return IDValues[indexMinValue];
}

function getMinExtraValue(extraValues) { //per prendre il prezzo minore
    return extraValues.reduce((minValue, currentValue) => {
        if (currentValue < minValue) {
            return currentValue;
        }
        return minValue;
    })
};

module.exports = router;