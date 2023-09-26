const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


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
  
  
router.get("/api/chartDateTimeEnergiot", async (req, res) => { //esecuzione della query con i dati presi dal front-end
    try {
      const accessToken = await getAccessToken();
      console.log(' 2 Access token:', accessToken);
      const apiUrl = 'http://172.16.1.9:30631/device-indexing/get_last_n_records/ASM03000006?last_n=144' 
      console.log("apiurl", apiUrl)
      const response = await fetch(apiUrl, {
        headers: {
          'Fiware-Service': 'energy',
          'Fiware-ServicePath': '/',
          'token': accessToken, //tipi di token, io usavo authotìrized
        },
      });
      const data = await response.json();
      console.log(data); // Dati ricevuti dall'API
      return res.status(201).send(data);
    } catch (error) {
      console.error(error);
    }
  });


module.exports = router;
