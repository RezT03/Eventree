const express = require('express')
const mysql = require('../../models/db')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/EOlogin', (req, res) => {
    res.render('./client/userlogin', {
        'title': "Login",
        'flash': req.flash('msg')
    })
})

router.post('/auth', (req, res) => {
    let username = req.body.username
    let pass = req.body.pass
    mysql.query(`SELECT * FROM vendor WHERE email = '${email}'`, (error, result, field) => {
        if (error) throw error
        if (result.length > 0) {
            bcrypt.compare(pass, result[0].password, (error, result) => {
                if (error) throw error
                if (result) {
                    mysql.query(`SELECT * FROM vendor WHERE email = '${email}'`, (error, result, field) => {
                        if (result) {
                            req.session.loggedin = true
                            vendor= result
                            req.session.vendor = true
                            res.redirect('/')
                        }
                    })
                } else {
                    req.flash('msg', 'Upss! Email Atau Password Salah')
                    res.redirect('/EOlogin')
                }
            })
        } else {
            req.flash('msg', 'Email tidak ditemukan!')
            res.redirect('EOlogin')
        }
    })
})

module.exports = router