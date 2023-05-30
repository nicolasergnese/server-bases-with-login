/* const router = require('express').Router();


const sql = require('mssql'); //qui invece con il metodo mssql mi da credenziali errate
const config = {
    user: 'Read_Only_ENG_MATRYCS',
    password: 'MATRYCS2021!',
    server: '172.16.1.136', // You can use 'localhost\\instance' to connect to named instance, telnet 172.16.1.136 1433
    database: 'Runtime',
    options: {
      encrypt: false // Use this if you're connecting to Azure SQL Database with true
    }
};

router.post("/chart", async(req,res)=>{ 
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT Value
      FROM dbo.History
      WHERE tagName = 'min_DB_ENM_001638.Cv'
    `);//select prende attributi/colonne,from prende la tabella,tagname prende
     console.log(result.recordset);
     result.recordset.forEach(element => {
      console.log(element);
    });
  } catch (error) {
    console.log(error);
  } finally {
    sql.close();
    console.log('finito');
  }
    //console.log(req.body) //mando dal server
  
    return res.status(201).send(result.recordset.forEach(element => {
      console.log(element);
    }));
    //console.log(req.body)

})


module.exports = router; */

const router = require('express').Router();
const sql = require('mssql');

const config = {
  user: 'Read_Only_ENG_MATRYCS',
  password: 'MATRYCS2021!',
  server: '172.16.1.136',
  database: 'Runtime',
  options: {
    encrypt: false
  }
};

router.post("/chart", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT DateTime, Value
      FROM dbo.History
      WHERE tagName = 'min_DB_ENM_001638.Cv'
      AND DateTime between '2022-07-01 00:00:00'
      AND  '2022-07-01 01:00:00'
    `);
    console.log(result.recordset);

    result.recordset.forEach(element => {
      console.log(element);
    });
    const numbers = result.recordset.map(record => parseFloat(record.Value))
    console.log(numbers);

    sql.close();
    console.log('finito');

    return res.status(201).send(numbers);

    /* return res.status(201).send(result.recordset.forEach(element => {
    })); */
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;



/* async function executeQuery() {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT DateTime, Value
      FROM dbo.History
      WHERE tagName = 'min_DB_ENM_001638.Cv'
      AND dateTime >= '2022-07-01 00:00:00'
      AND dateTime < '2022-08-01 00:00:00'
    `);
    SELECT DateTime, Value
      FROM dbo.History
      WHERE tagName = 'min_DB_ENM_001638.Cv'
      AND DateTime between '2022-07-01 00:00:00'
      AND  '2022-07-01 01:00:00'

    
    
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    sql.close();
  }
} */

/* executeQuery(); */

/* router.post("/chart", async(req,res)=>{ 
  //console.log(req.body) //mando dal server
  let numeriCasuali = []; //per generare numeri casuali, ma non s come metterli
        for (let i = 0; i < 10; i++) { //riempio array
          numeriCasuali.push(Math.floor(Math.random()*90));
        }
  return res.status(201).send(numeriCasuali);
  //console.log(req.body)

}) */

//listen for request on port 4000
/* router.post("/numeriCasuali", (req, res) => {
    let numeriCasuali = []; //per generare numeri casuali, ma non s come metterli
          for (let i = 0; i < 100; i++) { //riempio array
            numeriCasuali.push(Math.floor(Math.random()*90));
          }
      res.json(numeriCasuali);
  }) */
