const express = require('express')
const router = express.Router();
const {registerUser,loginAsUser,getUser,loginAsAdmin} = require('../controllers/authenticationController')

router.post("/register",registerUser)
router.post("/login",loginAsUser)
router.get("/user",getUser)
router.post("/admin/login",loginAsAdmin)

module.exports=router;