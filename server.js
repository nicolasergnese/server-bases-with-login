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
const home = require('./routes/home') //utilizzo i servizi della pagina ATOS, cookies

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
app.use(home); //utilizzo i servizi della pagina ATOS, cookies

/* 
//const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const axios = require('axios');


const apiUrl = 'http://rl-smart-optimizer.jmira.kserve.kf.iot-ngin.onelab.eu:80/v1/models/rl-optimizer:predict';
const requestData = {
  number_steps: 4,
  state_index: -1
};



router.get("/api/chartDateTimeHome", async (req, res) => {
    try {
        fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => console.log('Response data:', data))
        .catch(error => console.error('Error:', error));   
    } catch (error) {
        console.error(error);
    }
}); */


/* const ciao = async (req, res) => {
  try {
      fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => console.log('Response data:', data))
      .catch(error => console.error('Error:', error));   
  } catch (error) {
      console.error(error);
  }
};
ciao();
 */

/* const ciao = async () => {
  try {
    const response = await fetch(apiUrl, requestOptions);
    const data = await response.json();
    console.log('Response data:', data);
    const kpis = data.state_requested.kpis
    console.log(kpis)
  } catch (error) {
    console.error('Error:', error);
  }
};

ciao(); */

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

