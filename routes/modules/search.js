const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// 搜尋
// router.get('/', (req, res) => {
//   const userId = req.user._id
//   const keyword = req.query.keyword
//   Restaurant.find({ userId: { $eq: userId } })
//     .lean()
//     .then(restaurant => {
//       const searchRestaurant = restaurant.filter(restaurant => {
//         return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) ||
//         restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase()) ||
//         restaurant.name_en.toLowerCase().includes(keyword.trim().toLowerCase())
//       })
//       res.render('index', { restaurant: searchRestaurant, keyword: keyword })
//     })
//     .catch(error => console.error(error))
// })

router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' }, userId },
      { category: { $regex: keyword, $options: 'i' }, userId },
      { name_en: { $regex: keyword, $options: 'i' }, userId }
    ]
  })
    .lean()
    .then(restaurant => res.render('index', { restaurant: restaurant, keyword: keyword }))
    .catch(error => console.error(error))
})

module.exports = router
