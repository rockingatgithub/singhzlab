const Student = require('../models/student')

module.exports.create = async function (req, res) {
    console.log('reached')
    try {
        let student = await Student.findOne({
            email: req.body.email,
        })
        if (!student) {
            student = await Student.create({
                name: req.body.name,
                email: req.body.email,
                batch: req.body.batch,
                college: req.body.college,
                status: req.body.status,
            })
            return res.redirect('back')
        }
        return res.redirect('back')
    } catch (err) {
        console.log('Error is', err)
        return
    }
}

module.exports.getList = async function (req, res) {
    let students = await Student.find({})
        .populate('interview')
        .populate('course')
    return res.render('student_profile', {
        students: students,
    })
}
