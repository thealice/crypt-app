const bcrypt = require('bcrypt')
const salt = 12

const sessions = []
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = 3000

// just storing this here before adding firebase db
let tokens = {}

app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  //res.send('Hello class!!!!')
  res.sendFile(__dirname + '/index.html')
})

app.post('/register', (req, res) => {
  // would check the database instead of tokens if i had it set up
  if (Object.keys(tokens).includes(req.body.email)) {
    res.send({status: "email taken"})
  } else {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        // Store hash in your password DB.
        tokens[req.body.email] = hash
        console.log(tokens)
        res.send({ status: "registration complete" });
      })
  }


})

app.post('/session', (req, res)=>{
  bcrypt.compare(req.body.password, tokens[req.body.email], function(err, result) {
    if (result){
      res.send({status: "ok"})
    } else {
      res.send({status: "invalid"})
    }
  })
})

app.delete("/session",  () =>{
  // find session in db or memory and destroy
  //redirect to appropriate page
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})



      // bcrypt.compare('bacon', hash, function(err, result) {
      //   console.log(hash)
      //   console.log('bacon', result)

      // });
      // bcrypt.compare('bacon2', hash, function(err, result) {
      //   console.log('bacon2', result)
      //     // result == false
      // });