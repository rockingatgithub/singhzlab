const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: new Date(),
        },
        description: {
            type: String,
            default: 'An good IT company.'
        },
        student: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Interview = mongoose.model('Interview', interviewSchema)

module.exports = Interview
