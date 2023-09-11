const mysql = require('../../models/db')
const express = require('express')
const router = express.Router()
const upload = require('./upload')

const {
  v4: uuidv4
} = require('uuid')

router.get('/create', (req, res, next) => {
  if(req.session.login){
    res.render('./admin/upload-event')
  }else{
    res.redirect('/')
  }
  
})

router.post('/creating',upload.single(), (req, res, next) => {
  let id = uuidv4()
  let event = req.body.event
  let mulai = req.body.mulai
  let selesai = req.body.selesai
  let img = req.body.thumb
  let desc = req.body.desc
  let harga = req.body.price
  let userid = req.user.id

  mysql.query(`INSERT INTO event (event_id, nama_event, mulai, thumbnail, deskripsi, harga, userid) VALUES (?, ?, ?, ?, ?, ?)`, [id, event, mulai, selesai,img, desc, harga], (error, result, field) => {
    if (error) throw error
    res.redirect('/')
  })
})

module.exports = router