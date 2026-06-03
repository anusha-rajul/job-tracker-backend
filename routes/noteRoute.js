const express = require('express')
const router = express.Router()
const { createNote, getNotes, deleteNote, editNote } = require('../controllers/noteController')
const {isLoggedIn} = require('../controllers/userController')

router.post('/', isLoggedIn, createNote)
router.get('/getNotes/:id', isLoggedIn, getNotes)
router.delete('/delete/:id', isLoggedIn, deleteNote)
router.patch('/edit/:id', isLoggedIn, editNote)

module.exports = router