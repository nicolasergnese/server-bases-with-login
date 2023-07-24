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
//app.use(newRoutes); //utilizzo i servizi per la pagina new, mqtt
app.use(asmhqRoutes); //utilizzo i servizi per la pagina ASMHQ, mssql
app.use(dsoRoutes); //utilizzo i servizi per la pagina DSO, vincitore di una request


const Keycloak = require('keycloak-connect');
const session = require('express-session');
const axios = require('axios'); // Importa il modulo axios
const keycloakConfig = require('./keycloak.json');

// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.
const memoryStore = new session.MemoryStore();

app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Provide the session store to Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
const keycloak = new Keycloak({
  store: memoryStore,
  onfig: keycloakConfig // Utilizza il file keycloak.json per la configurazione
});

// Install the Keycloak middleware for protecting routes.
app.use(keycloak.middleware({
  protected: '/protectedresource'
}));

// A protected URL that requires authentication
app.get('/protectedresource', keycloak.protect(), async function (req, res) {
  console.log('accesso al servizio')
  try {
    console.log('accesso al servizio')
    // Esempio: Fare una richiesta GET a un'API esterna per ottenere un JSON
    const response = await axios.get('https://api.example.com/data');
    const jsonData = response.data; // Dati JSON ottenuti dalla risposta

    // Puoi ora utilizzare il JSON per elaborare la risposta che verrà restituita al client
    res.render('index', {
      jsonData: jsonData // Passa i dati JSON alla vista per l'elaborazione
    });
  } catch (error) {
    console.error('Errore nella richiesta API:', error);
    res.status(500).send('Errore nella richiesta API');
  }
});

/* const Keycloak = require('keycloak-connect');
const session = require('express-session');

//const memoryStore = new session.MemoryStore() in teoria non necessaria

// Configura la sessione
app.use(session({
  secret: 'il_tuo_segreto',
  resave: false,
  saveUninitialized: true,
  //store: memoryStore
}));

// Carica la configurazione da keycloak.json
const keycloakConfig = require('./keycloak.json');

// Configura l'istanza di Keycloak
const keycloak = new Keycloak({ 
  //store: memoryStore
  store: app.use.session,
  config: keycloakConfig
  //config: 'keycloak.json'
});

function rottaProtetta(req, res) {
  if (!res) {
    throw new Error('La variabile "res" non è definita correttamente.');
  }

  res.send('Hai accesso alla rotta protetta!');
}

app.get('/rotta-protetta', keycloak.protect(), rottaProtetta);

 */
/* 
const Keycloak = require('keycloak-connect');
const session = require('express-session');

// Configura la sessione
app.use(session({
  secret: 'il_tuo_segreto',
  resave: false,
  saveUninitialized: true,
}));

// Carica la configurazione da keycloak.json
const keycloakConfig = require('./keycloak.json');

// Configura l'istanza di Keycloak
const keycloak = new Keycloak({
  store: session,
  config: keycloakConfig
});
console.log('Istanza Keycloak configurata:', keycloak);

function rottaProtetta(req, res) {
  if (!res) {
    throw new Error('La variabile "res" non è definita correttamente.');
  }
  if (req.kauth && req.kauth.grant) {
    console.log('Utente autenticato:', req.kauth.grant.access_token.content);
  } else {
    console.log('Utente non autenticato o autenticazione fallita.');
  }

  res.send('Hai accesso alla rotta protetta!');
}

app.get('/rotta-protetta', keycloak.protect(), rottaProtetta); */

/* const Keycloak = require('keycloak-connect')
const hogan = require('hogan-express')
const express = require('express')
const session = require('express-session')
const fetch = require('node-fetch')

const app = express()


// Create a session-store to be used by both the express-session
// middleware and the keycloak middleware.
// Crea un session store da utilizzare sia per il middleware express-session che per il middleware keycloak.

const memoryStore = new session.MemoryStore() // Utilizza il MemoryStore per archiviare le sessioni in memoria

app.use(session({
  secret: 'mySecret', // Chiave segreta per firmare le sessioni
  resave: false,
  saveUninitialized: true,
  store: memoryStore // Utilizza il MemoryStore per memorizzare le sessioni
}))

// Provide the session store to the Keycloak so that sessions
// can be invalidated from the Keycloak console callback.
// Fornisce il session store a Keycloak in modo che le sessioni possano essere invalidate dal callback della console di Keycloak.

const keycloak = new Keycloak({
  store: memoryStore // Utilizza il MemoryStore per memorizzare le sessioni
configFile: 'keycloak.json'
})

// Install the Keycloak middleware.
// Installa il middleware di Keycloak.

app.use(keycloak.middleware({
  protected: '/protected/resource' // URL protetto che richiede l'autenticazione di Keycloak
}))


app.get('/protected/resource', keycloak.protect(), function (req, res) {
  // Esegui una richiesta Fetch per ottenere i dati da un servizio esterno
  fetch('http://example.com/api/data')
    .then(response => response.json())
    .then(data => {
      // Qui puoi manipolare i dati come preferisci
      res.render('index', {
        result: JSON.stringify(JSON.parse(req.session['keycloak-token']), null, 4),
        event: '1. Access granted to Default Resource\n',
        fetchedData: JSON.stringify(data, null, 4) // Passa i dati alla vista per mostrarli
      })
    })
    .catch(error => {
      // Gestisci eventuali errori durante la richiesta
      console.error('Error fetching data:', error)
      res.status(500).send('Error fetching data')
    })
}) */
/* const express = require('express');
const session = require('express-session');
const fetch = require('node-fetch');
const Keycloak = require('keycloak-connect');

const app = express();
const port = 3000;

// Configura la sessione
app.use(session({
  secret: 'il_tuo_segreto',
  resave: false,
  saveUninitialized: true,
}));

// Carica la configurazione da keycloak.json
const keycloakConfig = require('./keycloak.json');

// Configura l'istanza di Keycloak
const keycloak = new Keycloak({
  store: session,
  config: keycloakConfig,
});

// Middleware per proteggere le rotte
const protect = keycloak.protect();

// Rotta per ottenere i dati dalla API protetta
app.get('/dati-protetti', protect, async (req, res) => {
  try {
    // Esegui una richiesta Fetch per ottenere i dati dalla API protetta
    const response = await fetch('https://api.example.com/dati', {
      headers: {
        Authorization: `Bearer ${req.session['keycloak-token']}`, // Passa il token di autenticazione
      },
    });

    if (!response.ok) {
      throw new Error('Errore nella richiesta dati');
    }

    const data = await response.json();

    // Restituisci i dati ottenuti dalla API come risposta
    res.json(data);
  } catch (error) {
    console.error('Errore nella richiesta dati:', error);
    res.status(500).json({ error: 'Errore nella richiesta dati' });
  }
}); */



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`)); 

