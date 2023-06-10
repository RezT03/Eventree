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
})

module.exports = router