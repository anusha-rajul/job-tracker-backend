const mongoose = require('mongoose')

const applicationSchema = mongoose.Schema({
    companyName: String,
    role: String,
    salary: String,
    status: {
        type: String,
        enum: ['applied', 'interview', 'rejected', 'offer'],
       
    },
    appliedDate: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    platform: {
        type: String,
    }
   
})

module.exports = mongoose.model('application', applicationSchema)