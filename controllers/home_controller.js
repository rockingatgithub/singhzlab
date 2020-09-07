const Interview = require('../models/interview')
const Student = require('../models/student')

module.exports.home = async function (req, res) {
    let companies = await Interview.find({}).populate('student')
    let students = await Student.find({})
        .populate('interview')
        .populate('course')

    return res.render('home', {
        students: students,
        companies: companies,
    })
}
