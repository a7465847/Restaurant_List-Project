const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant.js')

// 新增餐廳內容 web新增餐廳(get) → create page → 餐廳表單(post) → 資料存入database → 渲染('/')
router.get('/create', (req, res) => res.render('create'))
router.post('/createList', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://dummyimage.com/600x300/096969/0ffabb.png&text=Restaurant'
  }
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定內容
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改餐廳內容 web編輯紐(get) → edit page → 表單(put)) → database找該ID、將修改資料存進去 → 渲染
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
router.put('/:id', (req, res) => {
  const id = req.params.id
  const options = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, options)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// 刪除
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
