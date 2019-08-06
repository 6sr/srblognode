const post = require('../database/models/Post')

module.exports = async (req,res) => {
    const posts = await post.findById(req.params.id).populate('author')

    console.log(req.params)

    res.render('post', {
        posts
    })
};

