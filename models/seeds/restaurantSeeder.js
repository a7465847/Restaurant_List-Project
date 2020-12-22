const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < restaurantList.length; i++) {
    Restaurant.create(restaurantList[i])
  }
  console.log('done')
})
