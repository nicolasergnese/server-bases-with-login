const router = require('express').Router();


router.get("/chart", async(req,res)=>{ 
    //console.log(req.body) //mando dal server
    let numeriCasuali = []; //per generare numeri casuali, ma non s come metterli
          for (let i = 0; i < 10; i++) { //riempio array
            numeriCasuali.push(Math.floor(Math.random()*90));
          }
    return res.status(201).send(numeriCasuali);
    //console.log(req.body)

})

//listen for request on port 4000
/* router.post("/numeriCasuali", (req, res) => {
    let numeriCasuali = []; //per generare numeri casuali, ma non s come metterli
          for (let i = 0; i < 100; i++) { //riempio array
            numeriCasuali.push(Math.floor(Math.random()*90));
          }
      res.json(numeriCasuali);
  }) */

module.exports = router;