const express = require('express');
const { isLoggedIn } = require('../controllers/userController');
const { applicationCreation, getApplication, deleteApplication, getEditPage, edit, handleStatus } = require('../controllers/applicationController');
const router = express.Router();

router.post('/create', isLoggedIn, applicationCreation)
router.get('/', isLoggedIn, getApplication)
router.delete('/delete/:id', isLoggedIn, deleteApplication)
router.get('/update/:id', isLoggedIn, getEditPage)
router.patch('/updateApp/:id', isLoggedIn, edit)
router.patch('/status/:id', isLoggedIn, handleStatus)

module.exports = router;