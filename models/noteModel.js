
const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    
   content: String,
  
    createdAt: {
        type: Date,
        default: Date.now
    },

    application: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'application'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

    
})

module.exports = mongoose.model('note', noteSchema)