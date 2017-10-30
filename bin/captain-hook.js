#!/usr/bin/env node

const argv = require('optimist').argv
const fs = require('fs')

const error = err => {
  console.error(err)
  process.exit(1)
}

const printHelpAndExit = () => {
  console.log(require('./utils/help'))
  process.exit(0)
}

if (argv.help) {
  printHelpAndExit()
}

let config = require('../lib/config')

if (argv.config && typeof argv.config === 'string') {
  if (fs.existsSync(argv.config)) config = require(argv.config)
  else error('Config file non esistente')
}

const captainHook = require('../lib/captain-hook')

captainHook(config)
