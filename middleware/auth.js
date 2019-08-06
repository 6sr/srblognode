const user = require('../database/models/User')

module.exports = (req, res, next) => {
    // Fetch user from database
    user.findById(req.session.userId, (error, user) => {
        if(error || !user) {
            return res.redirect('/')
        }

        next()
    })

    // verify user

    // if user is valid, permit request

    // else redirect
}