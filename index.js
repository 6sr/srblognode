// =========================================== Importing module for Environment variables ======================================
require('dotenv').config();
// console.log(process.env);

// ============================================ Importing module for defining paths ============================================
const path = require('path')

// ============================================ Importing express modules ============================================
const express = require('express')
const expressEdge = require('express-edge')
const app = new express()

// ============================================ Importing module to hide/show login, register, logout buttons ==============
const edge = require('edge.js')

// ============================================ Importing module to parse forms ============================================
const bodyParser = require('body-parser')

// ============================================ Importing module for database ============================================
const mongoose = require('mongoose')
// const post = require('./database/models/post')
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })

// ============================================ Importing module for image upload ============================================
const fileUpload = require('express-fileupload')

// ============================================ Importing module to upload data to remote server =============================
const cloudinary = require('cloudinary')

// ============================================ Importing module for user session ============================================
const expressSession = require('express-session')

// ============================================ Importing module for user session ============================================
const connectMongo = require('connect-mongo')

// ============================================ Importing module for displaying errors for single request ====================
const connectFlash = require('connect-flash')

// ============================================ Importing Controllers ============================================
const homePageController = require('./controllers/homePage')

const createPostController = require('./controllers/createPost')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')

const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')

const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

const logoutController = require('./controllers/logout')

// ============================================ Using Middleware ============================================
app.use(fileUpload())

// Storing session in database
const mongoStore = connectMongo(expressSession)
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(connectFlash())

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(express.static('public'))
//app.use(express.static(path.join(__dirname,'public')))

app.use(expressEdge)

// For post request - body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// ================ Defining my own middleware ================

// customMiddleware is not related to this app
const customMiddleware = (req, res, next) => {
    // console.log("customMiddleware is called");
    next();
}

// Using my middleware for all requests
app.use(customMiddleware)

const storePostMiddleware = require('./middleware/storePost')

// See similar way in post request below
// Using my middleware only for request to '/posts/store'
// app.use('/posts/store', storePostMiddleware);


const authMiddleware = require('./middleware/auth')

// See similar way in get request below
// app.use('/posts/new', authMiddleware)

const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')

// Sharing session userId globally
app.use('*', (req, res, next) => {
    // Using edge templating engine, the global variable 'auth' is available on 
    // all templates rendered by our templating engine
    edge.global('auth', req.session.userId)
    next()
})

// ============================================ Setting views directory ============================================
app.set('views',`${__dirname}/views`)


// ============================================ Creating actions for requests ============================================
app.get('/', homePageController)


app.get('/posts/new', authMiddleware, createPostController)

app.post('/posts/store', authMiddleware, storePostMiddleware, storePostController)

app.get('/post/:id', getPostController)


app.get('/auth/register', redirectIfAuthenticated, createUserController)

app.post('/users/register', redirectIfAuthenticated, storeUserController)


app.get('/auth/login', redirectIfAuthenticated, loginController)

app.post('/users/login', redirectIfAuthenticated, loginUserController)

app.get('/auth/logout', authMiddleware, logoutController)
// Below command is not able to logout but redirects to main page without logging out WHY?
// app.get('/auth/logout', redirectIfAuthenticated, logoutController)

app.use((req, res) => {
    res.render('not-found')
})

// ============================================ Running application at port 4000 ============================================
// http://localhost:port/
app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
})

