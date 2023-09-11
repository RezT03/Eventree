const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('./models/db')
const router = express.Router('caseSensitive')
const bodyParser = require('body-parser')
const session = require('express-session')
const { MemoryStore } = require('express-session')
const flash = require('express-flash')
const path = require('path')
const memoryStore = require('express-session')

// route calls
const userLogin = require('./controllers/client/userLoginControllers') //userLogin.
// const userEdit = require('./controllers/client/userEdit') //user
const admin = require('./controllers/client/EOLoginControllers') //adminLogin
const createEvent = require('./controllers/client/EOcreateEvent') //create events
const userReg = require('./controllers/client/userRegister')
const book = require('./controllers/client/userBookEvent') //User booking
const upload = require('./controllers/client/upload')
const { json } = require('body-parser')

app.set('trust proxy', 1)
app.use(session({
    cookie: {maxAge: 1000*60*60},
    store: new MemoryStore({checkPeriod: 60*60*24*30}),
    secret: 'HIMTIUNSIQ WEBDEV',
    saveUninitialized: false,
    resave: true
}))
app.use(flash())
app.use(express.json())
// app.use(bodyParser())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'ejs')
app.set('case sensitive routing', true)


app.get('/', (req, res)=>{
    
    mysql.query(`SELECT * FROM event`, (err, result, rows)=>{
        // console.log(result)
        if(err) throw err
        if(req.session.login){
            res.render('./client/index',{
                title: 'Eventree',
                event: result,
                login:true
            }) 
        }else{
            res.render('./client/index',{
                title: 'Eventree',
                event: result,
                login:false
            })
        }
        
        // console.log(login)
    })
})

app.get('/logout', (req, res) => {
    req.session.destroy((err)=>{
        res.redirect('/')
    });
})

app.get('/detail', (req, res) => {
    res.render('client/detail-event',{
        login:true
    })
})

app.use('/img/', express.static(path.join(__dirname, 'assets/img')))

app.use('/', userLogin)
app.use('/', book)
app.use('/', userReg)
app.use('/', admin)
app.use('/event', upload.single('img'), createEvent)

app.use((req, res) => {
    res.status(404).render('404')
  })

app.listen(3000)
