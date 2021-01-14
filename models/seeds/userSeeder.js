const User = require('../user')
const db = require('../../config/mongoose')

const users = [
  {
    name: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  }
]

db.once('open', () => {
  console.log('mongodb conneted')
  User.create(users[0])
  console.log('done')
})
