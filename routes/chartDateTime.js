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

router.post("/chartDateTime", async (req, res) => {
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
    const numbers = result.recordset.map(record => record.Value)
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