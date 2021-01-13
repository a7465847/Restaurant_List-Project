const exphbs = require('express-handlebars')
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const hbshelpers = require('handlebars-helpers')
const comparison = hbshelpers.comparison()
require('./config/mongoose')
const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
