const User = require('../models/user')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')
const Student = require('../models/student')
const Interview = require('../models/interview')
const Course = require('../models/course')
const Result = require('../models/result')

module.exports.signin = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('signin', {})
}

module.exports.signup = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('signup', {})
}

module.exports.createSession = function (req, res) {
    return res.redirect('/')
}

module.exports.create = async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back')
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            let user = await User.create({
                email: req.body.email,
                name: req.body.name,
                password: req.body.password,
            })
            return res.redirect('/users/signin')
        } else {
            return res.redirect('back')
        }
    } catch (err) {
        console.log('Error', err)
        return
    }
}

module.exports.createCsv = async function (req, res) {
    const csvWriter = createCsvWriter({
        path: '/uploads/users/csv/file.csv',
        header: [
            { id: '_id', title: 'STUDENT ID' },
            { id: 'name', title: 'NAME' },
            { id: 'college', title: 'COLLEGE' },
            { id: 'status', title: 'STATUS' },
            { id: 'dsa', title: 'DSA SCORE' },
            { id: 'webd', title: 'WEBD SCORE' },
            { id: 'react', title: 'REACT SCORE' },
            { id: 'company', title: 'COMPANY' },
            { id: 'date', title: 'DATE' },
            { id: 'result', title: 'RESULT' },
        ],
    })

    let student = await Student.find({})
    let interview = await Interview.find({})
    let course = await Course.find({})
    let result = await Result.find({})

    csvWriter.writeRecords(student)
    csvWriter.writeRecords(interview)
    csvWriter.writeRecords(course)
    csvWriter.writeRecords(result)
}
