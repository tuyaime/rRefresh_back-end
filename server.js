  console.log("may node be with you!")
  const express = require('express')
  const app = express();
  const bodyParser = require('body-parser')


  const MongoClient = require('mongodb').MongoClient
  const connectionString = `mongodb://Aime:himbaza1@ac-gojd4ej-shard-00-00.ogkjb5g.mongodb.net:27017,ac-gojd4ej-shard-00-01.ogkjb5g.mongodb.net:27017,ac-gojd4ej-shard-00-02.ogkjb5g.mongodb.net:27017/?ssl=true&replicaSet=atlas-y1cwg5-shard-0&authSource=admin&retryWrites=true&w=majority`

  MongoClient.connect(connectionString, {
          useUnifiedTopology: true,
          //  useNewUrlParser: true
      })
      .then(client => {
          console.log('Connected to Database')
          const db = client.db('star-wars-quotes')
          const quotesCellection = db.collection("quotes")
              // Make sure you place body-parser before your CRUD handlers!
          app.set("view engine,ejs")

          app.use(bodyParser.urlencoded({ extended: true }))
          app.use(express.static('public'))
          app.use(bodyParser.json())
          app.get("/api/:quote", (req, res) => {
              quotesCellection.find().toArray()
                  .then(result => {
                      console.log(result)
                      res.render('index.ejs', { quotes: result })
                  })
                  .catch(error => console.error(error))

          })
          app.post("/quotes", (req, res) => {
              quotesCellection.insertOne(req.body)
                  .then(result => {
                      console.log(result)
                      res.redirect("/")
                  })
                  .catch(error => console.error(error))
          })
          app.put('/quotes', (req, res) => {
              quotesCellection.findOneAndUpdate({ name: 'Yoda' }, {
                      $set: {
                          name: req.body.name,
                          quote: req.body.quote
                      }
                  }, {
                      upsert: true
                  })
                  .then(result => {
                      // console.log(result)
                      res.json('Success')
                  })
                  .catch(error => console.error(error))
          })
          app.delete('/quotes', (req, res) => {
              quotesCellection.deleteOne({ name: 'Darth Vadar' },

                  )
                  .then(result => {
                      if (result.deletedCount === 0) {
                          return res.json('No quote to delete')
                      }

                      res.json("delete darth vadar's quotes")
                  })
                  .catch(error => console.error(error))
          })
          app.listen(5000, () => {
              console.log('listening on 5000')
          })
      })

  .catch(error => console.error(error))