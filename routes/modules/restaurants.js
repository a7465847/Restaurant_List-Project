const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// 新增餐廳內容 web新增餐廳(get) → create page → 餐廳表單(post) → 資料存入database → 渲染('/')
router.get('/new', (req, res) => res.render('new'))
router.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://dummyimage.com/600x300/096969/0ffabb.png&text=Restaurant'
  }
  const restaurant = req.body
  const userId = req.user._id
  return Restaurant.create({ ...restaurant, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定內容
router.get('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId }).lean()
    .then(restaurant => {
      res.render('show', { restaurant: restaurant })
    })
    .catch(err => console.error(err))
})

// 修改餐廳內容 web編輯紐(get) → edit page → 表單(put)) → database找該ID、將修改資料存進去 → 渲染
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id

  Restaurant.findOne({ _id, userId }).lean()
    .then(restaurant => res.render('edit', { restaurant: restaurant }))
    .catch(err => console.error(err))
})

router.put('/:id', (req, res) => {
  const options = req.body
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => {
      restaurant = Object.assign(restaurant, options)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ userId, _id })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/', (req, res) => {
  const sort = req.query.sort
  let order = {}
  switch (sort) {
    case 'name_asc':
      order = { name: 'asc' }
      break
    case 'name_desc':
      order = { name: 'desc' }
      break
    case 'category':
      order = { category: 'asc' }
      break
    case 'location':
      order = { location: 'asc' }
      break
    case 'rating':
      order = { rating: 'desc' }
      break
  }
  Restaurant.find()
    .lean()
    .sort(order)
    .then(restaurant => res.render('index', { restaurant, sort }))
    .catch(error => console.error(error))
})

module.exports = router
