const Interview = require('../models/interview')
const Student = require('../models/student')

module.exports.home = async function (req, res) {
    return res.render('home', {})
}
