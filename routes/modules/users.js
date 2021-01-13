const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  return res.render('login', { userCSS: true })
})

module.exports = router
