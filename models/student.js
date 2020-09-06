const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    batch: {
        type: String,
        enum: ['weekend', 'weekday']
    },
    college: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['placed','not_placed']
    },

},
{
    timestamps: true,
})


const Student = mongoose.model('Student', studentSchema)
module.exports = Student