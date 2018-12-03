//@author Havya Ravipati
const express = require('express')
const api = express.Router()
const Model = require('../models/orderLineItem.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'orderLine'

// RESPOND WITH JSON DATA  --------------------------------------------

// GET all JSON
api.get('/findall', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const data = req.app.locals.orderLineItems.query
  res.send(JSON.stringify(data))
})

// GET one JSON by ID
api.get('/findone/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orderLineItems.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  res.send(JSON.stringify(item))
})

// RESPOND WITH VIEWS  --------------------------------------------

// GET to this controller base URI (the default)
api.get('/', (req, res) => {
  res.render('orderLine/index.ejs')
})

// GET create
api.get('/create', (req, res) => {
  LOG.info(`Handling GET /create${req}`)
  const item = new Model()
  LOG.debug(JSON.stringify(item))
  res.render('orderLine/create',
    {
      title: 'Create orderLine',
      layout: 'layout.ejs',
      orderLineItem: item
    })
})

// GET /delete/:id
api.get('/delete/:id', (req, res) => {
  LOG.info(`Handling GET /delete/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orderLineItems.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('orderLine/delete.ejs',
    {
      title: 'Delete orderLine',
      layout: 'layout.ejs',
      orderLineItem: item
    })
})

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orderLineItems.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('orderLine/details.ejs',
    {
      title: 'orderLine Details',
      layout: 'layout.ejs',
      orderLineItem: item
    })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.orderLineItems.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
  return res.render('orderLine/edit.ejs',
    {
      title: 'orderLineItems',
      layout: 'layout.ejs',
      orderLineItem: item
    })
})

// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.orderLineItems.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id, 10) // base 10
  item.orderID = req.body.orderID
  item.lineNumber = req.body.lineNumber
  item.productKey = req.body.productKey
  item.quantity = req.body.quantity
  data.push(item)
  LOG.info(`SAVING NEW orderLine ${JSON.stringify(item)}`)
  return res.redirect('/orderLine')
})

// POST update
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling SAVING ID=${id}`)
  const data = req.app.locals.orderLineItems.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
  LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
  item.lineNumber = req.body.lineNumber
  item.productKey = req.body.productKey
  item.quantity = req.body.quantity
  return res.redirect('/orderLine')
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.orderLineItems.query
  const item = find(data, { _id: id })
  if (!item) {
    return res.end(notfoundstring)
  }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _id: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/orderLine')
})

module.exports = api