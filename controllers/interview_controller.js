const Interview = require('../models/interview')
const Student = require('../models/student')

module.exports.create = async function (req, res) {
    try {
        let company = await Interview.create({
            company: req.body.company,
            date: req.body.date,
            description: req.body.description,
        })

        return res.redirect('back')
    } catch (err) {
        console.log('Error is: ', err)
        return
    }
}

module.exports.addStudent = async function (req, res) {
    try {
        let interview = await Interview.findById(req.params.id)
        let student = await Student.findOne({
            email: req.body.email,
        })

        interview.student.push(student.id)
        interview.save()

        student.interview.push(interview.id)
        student.save()

        return res.redirect('back')
    } catch (err) {
        console.log('Error', err)
        return
    }
}
