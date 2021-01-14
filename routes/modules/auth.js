const express = require('express')
const router = express.Router()
const passport = require('passport')

// 向 Facebook 發出請求，並向 Facebook 要求的資料。
router.get('/facebook', passport.authenticate('facebook', {
  scope: ['email', 'public_profile']
}))

// Facebook 把資料發回來，登入成功就進入 失敗返回
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: 'users/login'
}))

module.exports = router
