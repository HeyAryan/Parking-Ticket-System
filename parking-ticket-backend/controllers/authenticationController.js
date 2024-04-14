const appuser = require('../models/appuser')


exports.loginAsAdmin = async (req, res) => {
    console.log("loginAsAdmin called");
    console.log(req.body)
    userData = await exports.checkIfAdminCredentialsValid(req.body.userName, req.body.password);
    console.log("We got data after await");
    if (userData != null) {
        var userName = userData.userName;
        var role = userData.role;
        var user = { userName, role }
        console.log(user);
        req.session.user = user;
        req.session.save();
        res.status(200).json({ "status": "200", "data": user })

    } else {
        res.status(401).json({ "status": "401", "message": "Unauthorized Access!!!" })
    }
}

exports.checkIfAdminCredentialsValid = (userName, password) => {
    console.log("checkIfAdminCredentialsValid called")
    console.log(userName)
    console.log(password)
    return new Promise((resolve, reject) => {
        appuser.findOne({
            where: {
                userName: userName,
                password: password
            }
        })
            .then(user => {
                if (user) {
                    resolve(user);
                } else {
                    console.log("User not found");
                    resolve(null)
                }
            })
            .catch(error => {
                console.error("Error occurred:", error);
                reject(null);
            })
    })
}

exports.registerUser = (req, res) => {
    console.log("Register User Called")
    console.log(req.body);
    var appuserDto = {
        contact: req.body.contact,
        userName: req.body.userName,
        password: req.body.password,
        role: "USER"
    }
    appuser.create(appuserDto)
        .then(data => {
            console.log(data);
            res.status(200).json("User Registered Successfully");
        }, error => {
            console.log(error)
            res.status(420).send({
                message: error.message,
            })
        })
}

exports.loginAsUser = async (req, res) => {
    console.log("loginAsUser called");
    userData = await exports.checkIfUserCredentialsValid(req.body.contact, req.body.password);
    console.log("We got data");
    if (userData != null) {
        var contact = userData.contact;
        var role = userData.role;
        var user = { contact, role }
        console.log(user);
        req.session.user = user;
        req.session.save();
        res.status(200).json({ "status": "200", "data": user })

    } else {
        res.status(401).json({ "status": "401", "message": "Unauthorized Access!!!" })
    }
}

exports.getUser = async (req, res) => {
    console.log("getUser called");
    console.log(req.session)
    if (req.session.user != null) {
        var contact = userData.contact;
        var role = userData.role;
        var user = { contact, role }
        res.status(200).json({ "status": 200, "data": user })
    } else {
        res.status(401).json({ "status": "401", "message": "Unauthorized Access!!!" })
    }
}


exports.checkIfUserCredentialsValid = (contact, password) => {
    console.log("checkIfUserCredentialsValid called");
    return new Promise((resolve, reject) => {
        appuser.findOne({
            where: {
                contact: contact,
                password: password
            }
        })
            .then(user => {
                if (user) {
                    // console.log("User found:", user);
                    resolve(user);
                } else {
                    console.log("User not found");
                    resolve(null)
                }
            })
            .catch(error => {
                console.error("Error occurred:", error);
                reject(null);
            })
    })
}