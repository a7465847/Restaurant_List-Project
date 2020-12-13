//載入express
const express = require('express')
const app = express()

//載入handlebars  並設定樣板引擎
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//載入restaurant.json
const restaurantList = require('./restaurant.json')

//設定port
const port = 3000

//先讀取靜態網頁
app.use(express.static('public'))

//設定首頁 並且使用render
app.get('/', (req, res) => {
    res.render('index', { restaurant: restaurantList.results })
})

//設定餐廳介紹
app.get('/restaurants/:restaurant_id', (req, res) => {
    console.log(req.params.restaurant_id)
    const restaurant = restaurantList.results.find( restaurant => 
        restaurant.id.toString() === req.params.restaurant_id
    )
    res.render('show', { restaurant: restaurant })
})

//設定搜尋
app.get('/search', (req, res) => {
    const keyword = req.query.keyword
    const restaurant = restaurantList.results.filter( restaurant => 
        restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())
    )
    
    res.render('index', { restaurant: restaurant, keyword: keyword })
})

app.listen(port, () => {
    console.log(`Express is running on http://localhost:${port}`)
})
