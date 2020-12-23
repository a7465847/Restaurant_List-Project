const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')
const handlebars = require('handlebars')
// register helper
handlebars.registerHelper('sortMethod', function (type, selectedType, options) {
  return (type === selectedType) ? options.fn(this) : options.inverse(this)
})

// 首頁
router.get('/', (req, res) => {
  const type = req.query.sorting
  const sortMethod = {
    ratingAsc: { rating: 'desc' },
    timeAsc: { _id: 'asc' },
    timeDesc: { _id: 'desc' },
    nameAsc: { name: 'asc' },
    nameDesc: { name: 'desc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortMethod[type])
    .then(restaurant => res.render('index', { restaurant, type }))
    .catch(error => console.error(error))
})

module.exports = router
