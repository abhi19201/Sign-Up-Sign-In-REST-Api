const express = require('express')
const passport = require('passport')

const AuthCtrl = require("../controllers/authController")


const router = express.Router()

router.get('/', AuthCtrl.homePage)
router.get('/login', AuthCtrl.loginPage)
router.get('/register', AuthCtrl.registerPage)
router.get('/secrets', AuthCtrl.secretsPage)
router.get('/logout', AuthCtrl.logout)
router.get('/auth/google', passport.authenticate("google", {scope: ["profile"]}))
router.get('/auth/google/secrets', passport.authenticate("google", {failureRedirect: "/login"}), AuthCtrl.callback)
router.post('/login', AuthCtrl.login)
router.post('/register', AuthCtrl.register)

module.exports = router