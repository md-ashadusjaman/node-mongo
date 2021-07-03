const express = require('express');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
const { ObjectID } = require('mongodb');


const uri = "mongodb+srv://testUser:PBzc5XZL9SugTF0C@cluster0.20tqz.mongodb.net/testdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    // res.send('hello, I am learning the mongodb database')
    res.sendFile(__dirname + '/index.html');
})





client.connect(err => {
  const productCollection = client.db("testdb").collection("mydb");
//   console.log('database connection established')


app.get('/products', (req, res) => {
  // productCollection.find({}).limit(2)
  productCollection.find({})
  .toArray((error, documents) => {
    res.send(documents);
  })
})

app.get('/product/:id', (req, res) => {
  productCollection.find({_id: ObjectID(req.params.id)})
  .toArray((err, documents) => {
    res.send(documents[0]);
  })
})

  app.post("/addProduct", (req, res) => {

    const product = req.body;
    console.log(product);
    productCollection.insertOne(product)
    .then(result => {
      console.log('data added successfuly')
      // res.send('Sucessfully Added');
      res.redirect('/');
    })
    // collection.insertOne(product)
    // .then (result => {
    // console.log('One Product added successfully')
    })

app.patch('/update/:id', (req, res) => {
  productCollection.updateOne({_id: ObjectId(req.params.id)},
  {
    $set: {price: req.body.price, quantity: req.body.quantity}
  })
  .then(result => {
    // console.log(result);
    res.send(result.modifiedCount > 0)
  })
})


app.delete('/delete/:id', (req, res) => {
  // console.log(req.params.id);
  productCollection.deleteOne({_id: ObjectId(req.params.id)})
  .then (result => {
    // console.log('deleted')
    res.send(result.deletedCount > 0);
  })
})

  });


  // perform actions on the collection object
//   const product = {id:1, name:"rice", price:55, quantity:02};
 
//   client.close();




app.listen(3000);