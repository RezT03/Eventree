const express = require('express')
const mysql = require('../../models/db')
const bcrypt = require('bcryptjs')
const router = express.Router()

// user log_in
router.get('/login', (req, res) => {
    res.render('./client/login', {
        'tite': "Login",
        'flash': req.flash('msg'),
        // async: true
    })
})

router.post('/auth', (req, res) => {
    let email = req.body.email
    let pass = req.body.pass
    mysql.query(`SELECT * FROM user WHERE email = '${email}'`, (error, result, field) => {
        if (error) throw error
        if (result.length > 0) {
            bcrypt.compare(pass, result[0].password, (error, result) => {
                if (error) throw error
                if (result) {
                    mysql.query(`SELECT * FROM user WHERE email = '${email}'`, (error, result, field) => {
                        if (result) {
                            req.session.login = true
                            req.session.nama = result[0].nama_depan
                            user_id= result[0].user_id
                            res.redirect('/')
                        }
                    })
                } else {
                    req.flash('msg', 'Email atau Password salah!')
                    req.session.login = false
                    res.redirect('/login')
                }
            })
        } else {
            req.flash('msg', 'Email tidak ditemukan!')
            res.redirect('login')
        }
    })
})

// user register
router.get('/register', (req, res) => {
    res.render('./client/Register', {
        title:'Register', 
        flash: req.flash('err')
    })
})
router.post('/reg', (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    let fName = req.body.fName
    let lsName = req.body.lsName
    let tel = req.body.tel
    let id = Math.floor(Math.random()*90000000)+1 
    
        let sql = 'SELECT * FROM user WHERE email = ?'
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                    mysql.query(sql, [email], (error, result, field) => {
                        if(error) throw error
                        if(result.length > 0) {
                            req.flash('err', 'Email sudah terdaftar')
                            res.redirect('/register')
                        } else {
                            let sql = 'INSERT INTO user (user_id, email, nama_depan, nama_belakang,tel, password) VALUES (?, ?, ?, ?, ?, ?)'
                            mysql.query(sql, [id, email, fName, lsName, tel, hash], (error, result, field) => {
                                if(error) throw error
                                res.redirect('/login')
                            })
                        }
                    })
                }
            )
        })
    })

module.exports = router