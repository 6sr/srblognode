const mongoose = require('mongoose')

const post = require('./database/models/post')

mongoose.connect('mongodb://localhost/node-js-blog')
// mongoose.connect('mongodb://localhost/node-js-test-blog')

post.find({}, (error, post) => {
    console.log(error, post)
})

/*
post.deleteMany({}, (error, post) => {
    console.log(error, post)
})
*/
/*
// Updates database but prints old data
post.findByIdAndUpdate('5d2b6bdc2c17bc08f036346e',{
    title: 'My first blog post lorem ipsum'
}, (error, post) => {
    console.log(error, post)
})
(node:8392) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
(node:8392) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-null { _id: 5d2b6bdc2c17bc08f036346e,
  title: 'My first blog post',
  content: 'Lorem ipsum content',
  __v: 0 }
*/


/*
// Ids are in specific format psecially form mongodb i.e. order of alpha, num (maybe)
post.findById('5d2b6bdc2c17bc08f036346e', (error, post) => {
    console.log(error, post)
})
*/

/*
// Selecting data
post.find({                                 // Pass {} to get all i.e. select *
    title: 'My first blog post'
}, (error, post) => {
    console.log(error, post)
})
// Output
node:7376) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
null [ { _id: 5d2b6bdc2c17bc08f036346e,
    title: 'My first blog post',
    content: 'Lorem ipsum content',
    __v: 0 },
  { _id: 5d2b6bdc77e6f9079c8a46b7,
    title: 'My first blog post',
    content: 'Lorem ipsum content',
    __v: 0 } ]
*/

/*
// Inserting data
post.create({
    title: 'My first blog post',

    description: 'Blog post description',

    content: 'Lorem ipsum content'
}, (error, post) => {
    console.log(error, post)
})
// output
node:1948) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
null { _id: 5d2b6bdc77e6f9079c8a46b7,
  title: 'My first blog post',
  content: 'Lorem ipsum content',
  __v: 0 }
*/
