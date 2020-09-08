const fetch = require('node-fetch')
const Interview = require('../models/interview')
const Student = require('../models/student')
const Result = require('../models/result')

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

        let result = await Result.create({
            student: student.id,
            interview: interview.id,
            result: 'on hold',
        })

        return res.redirect('back')
    } catch (err) {
        console.log('Error', err)
        return
    }
}

module.exports.getList = async function (req, res) {
    let companies = await Interview.find({}).populate('student')
    return res.render('interview_list', {
        companies: companies,
    })
}

module.exports.getOtherList = async function (req, res) {
    try {
        let data = await fetch(
            'https://jobs.github.com/positions.json?location=India'
        ).then((data) => data.json())

        return res.render('external_joblist', {
            companies: data,
        })
    } catch (err) {
        console.log('Error is:', err)
        return
    }
}
