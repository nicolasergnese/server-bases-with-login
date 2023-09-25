require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


const newRoutes = require('./routes/endUser') //utilizzo i servizi della pagina new, mqtt
const asmhqRoutes = require('./routes/asmhq') //utilizzo i servizi della pagina ASMHQ, mssql
const dsoRoutes = require('./routes/dso') //utilizzo i servizi della pagina DSO, decreto il vincitore
const forecasted = require('./routes/forecasted') //utilizzo i servizi della pagina FORECASTED, cookies
const energiot = require('./routes/energiot') //utilizzo i servizi della pagina ENERGIOT, cookies

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
app.use(newRoutes); //utilizzo i servizi per la pagina new, mqtt
app.use(asmhqRoutes); //utilizzo i servizi per la pagina ASMHQ, mssql
app.use(dsoRoutes); //utilizzo i servizi per la pagina DSO, vincitore di una request
app.use(forecasted); //utilizzo i servizi della pagina FORECASTED, cookies
app.use(energiot); //utilizzo i servizi della pagina ENERGIOT, cookies


//const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const axios = require('axios');

/* const getAccessToken = async () => {
  try {
    const apiUrl = 'https://dynagrid.io:8000/api/login';
    const requestData = {
      email: 'asmterni@asmterni.it',
      password: 'bqcF2EEHPEmSRFVqoBHt'
    };  
    const headers = {
      'Content-Type': 'application/json'
    };
    const response = await axios.post(apiUrl, requestData, { headers });
    return response.data; // Restituisci direttamente i dati della risposta
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
};


const ciao = async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    console.log('Risposta dalla API:', accessToken);
    const refresh_token = accessToken.refresh_token; // Usa accessToken qui
    console.log('Valore di refresh_token:', refresh_token); 
    // Puoi inviare il refresh_token come risposta se necessario
    const apiUrl = 'https://dynagrid.io:8000/api/devices_by_idc?begin=last';
    const data = {
      idc: 'ASMT03-0x0007'
    };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `${refresh_token}`, // Assicurati di inserire il valore corretto per il cookie
      },
      body: JSON.stringify(data)
    });
    const dataResponse = await response.json();
    console.log(dataResponse); // Dati ricevuti dall'API
    res.status(200).json({ dataResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nella gestione dell\'access token o della richiesta API' });
  }
}; */


//ciao();

// Ora chiamando ciao(), dovresti ottenere i dati dell'access token e il refresh_token restituito dalla funzione getAccessToken()
/* 

const getAccessToken = async () => {
    try {
        const apiUrl = 'https://dynagrid.io:8000/api/login';
        // Dati da inviare nella richiesta POST
        const requestData = {
          email: 'asmterni@asmterni.it',
          password: 'bqcF2EEHPEmSRFVqoBHt'
        };  
        // Configura l'intestazione della richiesta
        const headers = {
          'Content-Type': 'application/json'
        };
        // Effettua la richiesta POST
        await axios.post(apiUrl, requestData, { headers })
          .then(response => {
            console.log('Risposta dalla API 1:', response.data);
            const refresh_token = response.data.refresh_token;
            console.log('Valore di refresh_token 2:', refresh_token); 
          })
          .catch(error => {
            console.error('Errore nella richiesta API:', error);
          });
    } catch (error) {
      console.error('Error in getAccessToken:', error);
      throw error;
    }
  };
  //getAccessToken();

  const ciao= async (req, res) => { //esecuzione della query con i dati presi dal front-end
    //try {
      const accessToken = await getAccessToken();
      console.log('Risposta dalla API:', accessToken);
      //console.log('Risposta dalla API:', accessToken.data);
      //const refresh_token = accessToken.data.refresh_token;
      //console.log('Valore di refresh_token:', refresh_token);
    /*   // Formattare le date nel formato desiderato
      /* const dateStart = parseISO(dateStartNew);
      const dateEnd = parseISO(dateEndNew);
      const formattedStart = format(dateStart, 'yyyy-MM-dd HH:mm:ss.SSSSSS');
      const formattedEnd = format(dateEnd, 'yyyy-MM-dd HH:mm:ss.SSSSSS'); 
   /   console.log("Formatted Start:", formattedStart);
      console.log("Formatted End:", formattedEnd); 
      const apiUrl = 'https://dynagrid.io:8000/api/devices/33?begin=last';
       console.log("apiurl", apiUrl)
      console.log(`sensor id : ${sensorIdValue}`);
      console.log(`ervice id: ${serviceIdValue}`);
      console.log(`date start: ${formattedStart}`);
      console.log(`date end: ${formattedEnd}`); 
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refresh_token}`, // Aggiungi il token Bearer qui
        },
      });
      const data = await response.json();
      console.log(data); // Dati ricevuti dall'API
      return res.status(201).send(data);
    } catch (error) {
      console.error(error); 
    }
  };

ciao();
 */


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

