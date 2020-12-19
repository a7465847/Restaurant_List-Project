const exphbs = require('express-handlebars')
const express = require('express')
const restaurantList = require('./restaurant.json')
const Restaurant = require('./models/restaurant.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb conneted')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

// 透過models 取出資料傳給 index 樣板
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

// 新增餐廳內容 web新增餐廳(get) → create page → 餐廳表單(post) → 資料存入database → 渲染('/')
app.get('/create', (req, res) => res.render('create'))
app.post('/createList', (req, res) => {
  if (!req.body.restaurantImage) {
    req.body.image = 'https://via.placeholder.com/600x300.png?text=Restaurants'
  }
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 瀏覽特定內容
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// 修改餐廳內容 web編輯紐(get) → edit page → 表單(post) → database找該ID、將修改資料存進去 → 渲染
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})
app.post('/restaurants/:id/edit', (req, res) => {
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

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurant = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())
  })
  res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
