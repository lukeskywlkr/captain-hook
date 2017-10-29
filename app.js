const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const exec = require('child_process').exec

const config = require('./config/config')
const slackbot = require('./plugins/slackbot')
const statusOk = 200

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/', (req, res) => {
  let data = {}
  let branch = `refs/heads/${ config.git.branch }`

  data = req.body
  console.log('Received body data:')
  console.log(data)
  //TODO Check data, then start the app updating script.
  //ONlY for gitlab versions > 7
  //if(data.object_kind == "push") {
  if (data.repository.name == config.git.repository && data.ref == branch) {
    exec(config.scripts.update, (error, stdout, stderr) => {
      console.log(`stdout: ${ stdout }`)
      console.log(`stderr: ${ stderr }`)
      if (error != null) console.log(`exec error: ${ error }`)
    })
  } else if (
    data.repository.name == config.git.repository &&
    config.plugins.slackbot.activate
  ) {
    slackbot.sendMessage(data)
  }

  res.writeHead(statusOk, { 'Content-Type': 'text/plain' })
  res.end()
})

http
  .createServer(app)
  .listen(config.server.port, config.server.hostname, () => {
    console.log(`Listening on port ${ config.server.port }`)
    console.log(`Returning status code ${ statusOk }`)
  })
