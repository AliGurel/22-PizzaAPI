"use strict"
/* -------------------------------------------------------
    EXPRESS - Pizza API
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- *
{
  "username": "test",
  "password": "Qaz12345?"
}
{
  "email": "aliigurel@gmail.com",
  "username": "ceral",
  "password": "Qaz12345?"
}
id: 6601c99e56aec9e0ea847e46
email: "test@test.com"
token: 6830c11c7c68cd2d9918fc3634ae55738bd471d27b591b268c5de3b4c3472efd
/* ------------------------------------------------------- */

const auth = require('../controllers/auth')

// URL: /auth

// Login/logout:
router.post('/login', auth.login)
router.post('/refresh', auth.refresh)
// router.all('/logout', auth.logout) // swagger .all metodunu görmez
router.get('/logout', auth.logout)

/* ------------------------------------------------------- */
module.exports = router