require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');


const newRoutes = require('./routes/new') //utilizzo i servizi della pagina new, mqtt
const asmhqRoutes = require('./routes/asmhq') //utilizzo i servizi della pagina ASMHQ, mssql
const dsoRoutes = require('./routes/dso') //utilizzo i servizi della pagina DSO, decreto il vincitore

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


const axios = require('axios');

const getAccessToken = async () => {
  const authservice_session = 'MTY5MTA1OTAyMXxOd3dBTkZWWFMwNWFWVXBKV2xkUVdrWlRUa2xUV1RORVYxQlVXRlJIUlVZMVRGSllSMWxVUVRWU1NGcE5NazFITlZkQ1NVSlNSRUU9fJC6PJfrENFhTOJzrekm8ulR0Zsi158ITqtxaVN31F5Q'; // Assicurati di sostituire 'YOUR_AUTH_SESSION_TOKEN' con il token effettivo
  url = 'http://ol-smart-grid-power-consumption.jmira.kserve.kf.iot-ngin.onelab.eu/v1/models/ol-smart-grid-power-consumption:predict'
  const headers = {
    'Content-Type': 'application/json',
    'Cookie': 'authservice_session=' + authservice_session,
  };
  const payload = {
    "service": "power-generation"
  };
  // Effettua la richiesta POST all'API
  axios.post(url, payload, { headers })
    .then(response => {
      console.log('Risposta:', response.data);
    })
    .catch(error => {
      console.error('Errore:', error.message);
    });
};
getAccessToken();




const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

