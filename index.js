const express = require('express');
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;


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

  app.post("/addProduct", (req, res) => {

    const product = req.body;
    console.log(product);
    productCollection.insertOne(product)
    .then(result => {
      console.log('data added successfuly')
    })



    // collection.insertOne(product)
    // .then (result => {
    // console.log('One Product added successfully')
    })
  })


  // perform actions on the collection object
//   const product = {id:1, name:"rice", price:55, quantity:02};
 
//   client.close();




app.listen(3000);