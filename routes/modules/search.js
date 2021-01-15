const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// 搜尋
router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({ userId: { $eq: userId } })
    .lean()
    .then(restaurant => {
      const searchRestaurant = restaurant.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
        restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase()) ||
        restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
      })
      res.render('index', { restaurant: searchRestaurant, keyword: keyword })
    })
    .catch(error => console.error(error))
})

module.exports = router
