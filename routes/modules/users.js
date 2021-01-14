const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login', { login: true })
})

router.get('/register', (req, res) => {
  return res.render('register', { register: true })
})

router.post('/register', (req, res) => {
  // const { name, email, password, confirmPassword } = req.body
  console.log(req.body)
})

module.exports = router
