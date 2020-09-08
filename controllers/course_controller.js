const Course = require('../models/course')
const Student = require('../models/student')


// =================================controller to add course info=====================================================

module.exports.create = async function (req, res) {
    try {
        let course = await Course.findOneAndUpdate(
            {
                student: req.params.id,
            },
            {
                dsa: req.body.dsa,
                webd: req.body.webd,
                react: req.body.react,
            }
        )
        if (!course) {
            course = await Course.create({
                dsa: req.body.dsa,
                webd: req.body.webd,
                react: req.body.react,
                student: req.params.id,
            })
        }
        let student = await Student.findByIdAndUpdate(req.params.id, {
            course: course.id,
        })
        return res.redirect('back')
    } catch (err) {
        console.log('Error is', err)
        return
    }
}
