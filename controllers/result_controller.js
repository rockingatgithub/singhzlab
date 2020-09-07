const Result = require('../models/result')
const Student = require('../models/student')

module.exports.create = async function (req, res) {
    try {
        let result = await Result.findOneAndUpdate(
            {
                interview: req.query.interview,
                student: req.query.candidate,
            },
            {
                result: req.body.result,
            }
        )
        if (!result) {
            result = await Result.create({
                interview: req.query.interview,
                student: req.query.candidate,
                result: req.body.result,
            })
        }

        

        return res.redirect('back')
    } catch (err) {
        console.log('Error is', err)
        return
    }
}
