const Student = require('../models/student')
const Result = require('../models/result')
const Course = require('../models/course')

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

            let course = await Course.create({
                dsa: 0,
                webd: 0,
                react: 0,
                student: student.id,
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
