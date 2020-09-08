// ======================================================course schema and fields======================================

const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema(
    {
        dsa: {
            type: Number,
            default: 0,
        },
        webd: {
            type: Number,
            default: 0,
        },
        react: {
            type: Number,
            default: 0,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
        },
    },
    {
        timestamps: true,
    }
)

const Course = mongoose.model('Course', courseSchema)
module.exports = Course
