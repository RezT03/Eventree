const express = require('express')
const mysql = require('../../models/db')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/search', (req,res) => {
        let cari = req.query.keyword
        
        mysql.query('SELECT * FROM perangane_awak WHERE kata_dasar LIKE ?', [cari], (err, result) => {
            if (err) throw err
            if(req.session.loggedin) {
                res.render('result', {
                    title: 'Hasil Pencarian',
                    hasil: result,
                    cari: cari,
                    login: true
                })	
            } else{
                res.render('result', {
                    title: 'Hasil Pencarian',
                    hasil: result,
                    cari: cari,
                    login: false
                })	
            }
        })
    })
    
module.exports = router