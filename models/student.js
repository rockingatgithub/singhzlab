// ======================================================student schema and fields======================================


const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        batch: {
            type: String,
            enum: ['Weekend', 'Weekday'],
        },
        college: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['placed', 'not_placed'],
        },
        interview: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Interview',
            },
        ],
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
    },
    {
        timestamps: true,
    }
)

const Student = mongoose.model('Student', studentSchema)
module.exports = Student
