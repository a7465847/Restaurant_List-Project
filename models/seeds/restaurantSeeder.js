if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')
const Restaurant = require('../Restaurant')
const restaurantList = require('../../restaurant.json').results
const db = require('../../config/mongoose')
const User = require('../user')

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]
db.once('open', () => {
  SEED_USER.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        name: user.name,
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        if (user.name === 'user1') {
          return Promise.all(Array.from(
            { length: 3 }, (_, i) => Restaurant.create({ ...restaurantList[i], userId })
          ))
        }
        if (user.name === 'user2') {
          return Promise.all(Array.from(
            { length: 3 }, (_, i) => Restaurant.create({ ...restaurantList[i + 2], userId })
          ))
        }
      })
      .then(() => {
        console.log('done')
        process.exit()
      })
  })
})
