const post = require('../database/models/Post')

module.exports = async (req,res) => {
    // populate helps get whole data of the author of post
    const posts = await post.find({}).populate('author')

    // console.log(posts)
    console.log(req.session)

    res.render('index', {
        posts
    })
};

