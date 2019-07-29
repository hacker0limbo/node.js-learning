const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  }, 
  author: {
    type: String,
  },
  body: {
    type: String,
    require: true,
  }
})

module.exports = mongoose.model('Article', articleSchema)