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

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.error(error))
})

// 建立餐廳內容
app.get('/create', (req, res) => res.render('create'))

app.post('/createList', (req, res) => {
  if (!req.body.restaurantImage) {
    req.body.image = 'https://via.placeholder.com/600x300.png?text=Restaurants'
  }
  const restaurant = req.body
  console.log(restaurant)
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  console.log(req.params.restaurant_id)
  const restaurant = restaurantList.results.find(restaurant => {
    return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: restaurant })
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
