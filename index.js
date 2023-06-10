const express = require('express')
const app = express()
const ejs = require('ejs')
const mysql = require('./models/db')
const router = express.Router('caseSensitive')
const session = require('express-session')
const { MemoryStore } = require('express-session')
const flash = require('express-flash')
const path = require('path')
// const memoryStore = require('express-session')
// route calls
const userLogin = require('./controllers/client/userLoginControllers') //userLogin.
const admin = require('./controllers/client/EOLoginControllers') //adminLogin
const createEvent = require('./controllers/client/EOcreateEvent') //create events
const eoReg = require('./controllers/client/EOregister')
const book = require('./controllers/client/userBookEvent')

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
app.use(express.urlencoded({extended: true}))
// app.use(express.static(join(__dir)))

app.set('view engine', 'ejs')
app.set('case sensitive routing', true)


app.get('/', (req, res)=>{
    
    mysql.query(`SELECT * FROM event`, (err, result, rows)=>{
        // console.log(result)
        if(err) throw err
        if(req.session.loggedin){
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
    })
})

// app.get('/apps', (req, res, next) => {
//     res.render('client/home')
// })


// app.get('/event/:id/create', (req, res) => {
//     let id= req.params.id 
//     res.send(id)
// })

app.use('/img/', express.static(path.join(__dirname, 'assets/img')))

app.use('/', userLogin)
app.use('/', book)

app.use('/eo', eoReg)
app.use('/', admin)
app.use('/event', createEvent)

app.use((req, res) => {
    res.status(404).render('404')
  })

app.listen(3000)
