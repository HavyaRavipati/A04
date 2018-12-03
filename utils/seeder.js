
const Datastore = require('nedb')
const LOG = require('../utils/logger.js')

const customers = require('../data/customers.json')
const products = require('../data/products.json')
const orders = require('../data/orders.json')
const orderLineItems = require('../data/orderLineItems.json')

//........................................................

module.exports = (app) => {
  LOG.info('START seeder.')
  const db = {}

  
  // FOR FALL 2018....................................

  // Customers don't depend on anything else............

  db.customers = new Datastore()
  db.customers.loadDatabase()

  // insert the sample data into our data store
  db.customers.insert(customers)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.customers = db.customers.find(customers)
  LOG.debug(`${app.locals.customers.query.length} customers seeded`)

  // Products don't depend on anything else ...............

  db.products = new Datastore()
  db.products.loadDatabase()

  // insert the sample data into our data store
  db.products.insert(products)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.products = db.products.find(products)
  LOG.debug(`${app.locals.products.query.length} products seeded`)


  // order need a customer .................................

  db.orders = new Datastore()
  db.orders.loadDatabase()

  // insert the sample data into our data store
  db.orders.insert(orders)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.orders = db.orders.find(orders)
  LOG.debug(`${app.locals.orders.query.length} order seeded`)

  // Each Order Line Item needs a product and an order...................

  db.orderLineItems = new Datastore()
  db.orderLineItems.loadDatabase()

  // insert the sample data into our data store
  db.orderLineItems.insert(orderLineItems)

  // initialize app.locals (these objects will be available to our controllers)
  app.locals.orderLineItems = db.orderLineItems.find(orderLineItems)
  LOG.debug(`${app.locals.orderLineItems.query.length} orderLineItems seeded`)

  
  LOG.info('END Seeder. Sample data read and verified.')
}