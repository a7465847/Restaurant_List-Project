const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})
db.once('open', () => {
  console.log('mongodb conneted')
})

module.exports = db
