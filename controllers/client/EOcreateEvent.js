const mysql = require('../../models/db')

const express = require('express')
const router = express.Router()
const upload = require('./upload')

const {
  v4: uuidv4
} = require('uuid')

router.get('/create', (req, res, next) => {
  if(req.session.vendor){
    response.render('./admin/createEvent')
  }else{
    res.redirect('/')
  }
  
})

router.post('/creating',upload.single(), (req, res, next) => {
  let event = req.body.event
  let mulai = req.body.mulai
  let selesai = req.body.selesai
  let img = req.file
  let thumbnail = img.path
  let desc = req.body.desc
  let harga = req.body.harga
  let category = req.body.category
  let vendor_id = req.vendor.id
  let id = uuidv4()

// router.post('/uploadImage') 

  mysql.query(`INSERT INTO event (event_id, nama_event, mulai, selesai, thumbnail, category, deskripsi, harga) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [id, event, mulai, selesai, thumbnail, category, desc, harga], (error, result, field) => {
    if (error) throw error
    res.redirect('/')
  })
})

module.exports = router