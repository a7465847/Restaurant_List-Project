const exphbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const hbshelpers = require('handlebars-helpers')
const comparison = hbshelpers.comparison()
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const usePassport = require('./config/passport')
require('./config/mongoose')

const app = express()
const port = process.env.PORT

app.engine('hbs', exphbs({ helpers: comparison, defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // true 強制與使用者互動後 session to add session store
  saveUninitialized: true // 登入前先追蹤使用者
}))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
usePassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  res.locals.errors_msg = req.flash('errors_msg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
