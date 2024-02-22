const mysql = require('../../models/db')
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()

router.get('/register', (req, res) => {
    res.render('./client/userRegister', {
        title: 'Register-Eventree',
        flash: req.flash('err')
    })
})

router.post('/reg', (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let fullName = req.body.fullName
    let username = req.body.username
    let tel = req.body.tel
    let id = Math.floor(Math.random() * 90000000) + 1

    let sql = 'SELECT * FROM user WHERE email = ?'
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            mysql.query(sql, [email], (error, result, field) => {
                if (error) throw error
                if (result.length > 0) {
                    req.flash('err', 'Email sudah terdaftar')
                    res.redirect('/register')
                } else {
                    let sql = 'INSERT INTO vendor (userid, email, fullName, username, tel, password) VALUES (?, ?, ?, ?, ?, ?, ?)'
                    mysql.query(sql, [id, email, fullName, hash], (error, result, field) => {
                        if (error) throw error
                        res.redirect('/login')
                    })
                }
            })
        })
    })
})

module.exports = router