const express = require('express')
const router = express.Router()
const mysql = require('../../models/db')

router.get('/', (req, res) => {
    res.render()
})

router.get('/events/book/:event_id', (req, res) => {
    // res.render('')
    let id = req.params.event_id
    mysql.query(`SELECT * FROM event WHERE event_id = "${id}"`, (err, result, rows) => {
        if(err) throw err
        res.render('client/bookEvent',{
            result: result
        })
    })
})

router.get('/events/checkout/:event_id', (req, res) => {
    res.render('client/payment')
    let user = req.user_id
    let event = req.params.event_id
    let number = Math.floor(Math.random()*999999999999999)+1
    if(paid){
        mysql.query(`INSERT INTO ticket(eventid, user_id, ticket_no) VALUES (?, ?, ?)`, [event, user, number], (error, result)=>{
            if(error) throw error
            res.redirect('/account/myticket')
        })
    }
})

module.exports = router