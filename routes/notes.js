const notesRouter = require('express').Router()
const fs = require('fs')
const util = require('util')
const uuid = require('../helpers/uuid')
const { readFromFile, readAndAppend } = require('../helpers/fsUtils')


notesRouter.get('/', (req, res) => {
    console.info(`${req.method} request received for note`)
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

notesRouter.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note`)
    console.log(req.body)
  
    const { title, text } = req.body
  
    if (req.body) {
      const newNote = {
        title,
        text,
        id: uuid()
      };
  
      readAndAppend(newNote, './db/db.json')
      res.json(`Note added successfully`)
    } else {
      res.error('Error in adding note')
    }
})

module.exports = notesRouter


