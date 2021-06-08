const express = require('express');
const cors = require('cors');
const bodyParser = require('body-Parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());



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



  //post request

  app.post('/addUser', (req, res) => {
     //console.log('data received',req.body);
     //save to database
     const user = req.body;
     user.id = 44;
     res.send(user);
  })
  
  app.listen(3000, () => console.log("listening the calling port"))