const user = require('../database/models/User')

module.exports = (req,res) => {
    user.create(req.body, (error, user) => {
        if(error) {
            // console.log(Object.keys(error.errors))
            // console.log(Object.keys(error.errors).map(key => error.errors[key].message))

            const registerationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            req.flash('registerationErrors', registerationErrors)

            req.flash('data', req.body)

            // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            // This error if this not returned
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
};

