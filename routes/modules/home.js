const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// 首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

module.exports = router
