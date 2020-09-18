const bcrypt = require('bcrypt')
const saltRounds = 12
const myPlaintextPassword = 'bacon'
const someOtherPlaintextPassword = 'not_bacon'
const sessions = []
const express = require('express')
const app = express()

const port = 3000
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/submit', (req, res) => {
  // req header
  // genSalt bcrypt hash
  // add record to DB
})

app.post('/session', (req, res)=>{
  //look in the header for password data
  // check the email associated with this password
  // bcryct compare 
  // if statement
  // add session to memory db
  // send back an ok status
  // else reject
})

app.delete("/session",  () =>{
  // find session in db or memory and destroy
  //redirect to appropriate page
})

app.listen(port, () => {
  console.log(`Beginner app listening at http://localhost:${port}`)
})

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.

      bcrypt.compare('bacon', hash, function(err, result) {
        console.log(hash)
        console.log('bacon', result)

      });
      bcrypt.compare('bacon2', hash, function(err, result) {
        console.log('bacon2', result)
          // result == false
      });
    })
})