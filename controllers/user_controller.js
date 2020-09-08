const User = require('../models/user')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const path = require('path')
// const loadash = require('loadash')
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
    try {
        const csvWriter = createCsvWriter({
            path: path.join(__dirname, '..', '/uploads/users/csv/file.csv'),
            headerIdDelimiter: '.',
            header: [
                { id: '_id', title: 'STUDENT ID' },
                { id: 'name', title: 'NAME' },
                { id: 'batch', title: 'BATCH' },
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

        let student = await Student.find({}).populate('interview').populate({
            path: 'course',
        })

        let newModifiedArray = []
        let modifiedArrayObject = student.map(modify)
        async function modify(student) {
            student.interview.map(modifyAgain)
            async function modifyAgain(interviewObj) {
                let resultObj = await Result.findOne({
                    student: student._id,
                    interview: interviewObj._id,
                })

                let course = await Course.findOne({
                    student: student._id,
                })

                const { _id, name, batch, college, status } = student
                const { dsa, webd, react } = course
                const { company, date } = interviewObj
                const { result } = resultObj

                let obj = {
                    _id,
                    name,
                    batch,
                    college,
                    status,
                    dsa,
                    webd,
                    react,
                    company,
                    date,
                    result,
                }
                // console.log(obj)
                newModifiedArray.push(obj)
                // console.log(newModifiedArray[newModifiedArray.length - 1])
                await csvWriter.writeRecords(newModifiedArray)
            }
        }

        return res.redirect('back')
    } catch (err) {
        console.log('Error is:', err)
        return
    }
}

module.exports.downloadCsv = async function (req, res) {
    return res.download(
        `${path.join(__dirname, '..', '/uploads/users/csv/file.csv')}`
    )
}
