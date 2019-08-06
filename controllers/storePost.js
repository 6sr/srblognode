const path = require('path')

const cloudinary = require('cloudinary')

const post = require('../database/models/Post')

module.exports = (req,res) => {
    const { image } = req.files

    const uploadPath = path.resolve(__dirname, '..', 'public/posts', image.name)
    image.mv(uploadPath, (error) => {

        cloudinary.v2.uploader.upload(uploadPath, (error, result) => {
            if(error) {
                return res.redirect('/');
            }
            
            post.create({
                ...req.body,
                image: result.secure_url,
                // image: `/posts/${image.name}`,
                author: req.session.userId
            }, (error, post) => {
                res.redirect('/')
            })
        });

    })

    // console.log(req.files)

    // console.log(req.body)

    //console.log(req.body)
    // prints post form data
};

