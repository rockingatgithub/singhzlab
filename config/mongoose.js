// ========================================establish database connection=============================================

const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/singhzlab`, {
    useUnifiedTopology: true,
    useFindAndModify: false,
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'error in connect to database'))

db.once('open', function () {
    console.log('Connected to db')
})

module.exports = db
