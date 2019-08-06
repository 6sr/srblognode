const bcrypt = require('bcrypt')

const user = require('../database/models/User')

module.exports = (req, res) => {
    const { email, password } = req.body;

    // Try to find user
    user.findOne({ email }, (error, user) => {
        if(user) {
            // Compare password
            // bcrypt.compare(user input, hashed version)
            bcrypt.compare(password, user.password, (error, result) => {
                if(result) {
                    // Successful Login

                    // Store user session
                    req.session.userId = user._id

                    // Redirect to login
                    res.redirect('/')
                }
                else {
                    res.redirect('/auth/login')
                }
            })
        }
        else {
            return res.redirect('/auth/login')
        }
    })
}
