// Validate Create Post Middleware

module.exports = (req, res, next) => {
    // if(!req.files.image) {
    if(!req.files || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new')
    }
    console.log("validateCreatePostMiddleware is called");
    next();
}
