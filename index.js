const express = require('express')
const app = express()


app.get('/', (req, res) => {
    const fruit = {
        product:"banana",
        price:45
    }
    res.send(fruit);
  });


  app.get('/fruits/banana', (req, res) => {
      res.send({fruits:'banana', quantity:200, price:800});
  })

  //crating dynamic api

  const users = ["asad","nobel", "karim", "rahim"]
  app.get ('/users/:id', (req,res) =>{
      const id = req.params.id;
      //console.log(req.params.id)
        const name = users[id]
        res.send({name,id});

  })
  
  app.listen(3000, () => console.log("listening the calling port"))