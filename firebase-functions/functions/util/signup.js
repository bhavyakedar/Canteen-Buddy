const express = require('express')
const bodyParser = require('body-parser')
const { functions, firebase, admin } = require('../firebase-init.js');
const { error } = require('firebase-functions/lib/logger');

function signupParent(req, res) {
    let signup = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "" && req.body.password == req.body.conformPassword) {

        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
            .then(user => {
                let newParent = {
                    parentName: req.body.parentName,
                    childName: req.body.childName,
                    mobileNumber: req.body.mobileNumber,
                    email: req.body.email,
                };
                if (firebase.auth().currentUser != null) {
                    admin.firestore().collection('parents').add(newParent)
                        .catch(function (err) {
                            console.log("Hello");
                            signup.error = true;
                        });
                }
            })
            .catch(function (err) {
                signup.error = { ec: err.code, msg: err.message };
            });
    }
    res.json(signup);
    res.end();
}

function signupVendor(req, res) {
    var signup = {
        error: false,
    };

    if (req.body.email != "" && req.body.password != "" && req.body.password == req.body.conformPassword) {

        firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).then((user) => {
            let newVendor = {
                vendorName: req.body.vendorName,
                mobileNumber: req.body.mobileNumber,
                email: req.body.email,
            };
            admin.firestore().collection('vendors').add(newVendor)
                .then(function (user) {
                    signup.error = false;
                }).catch(function (err) {
                    signup.error = true;
                });
        }).catch(function (err) {
                signup.error = { ec: err.code, msg: err.message };
            });
    }
    res.json(signup);
    res.end();
}


exports.signupParent = signupParent
exports.signupVendor = signupVendor

// {
//     "vendorName": "Developer",
//     "mobileNumber" : "9328661966",
//     "email" : "qwerty.dev2020@gmail.com",
//     "password": "justdoit"
// }

// {
//     "parentName": "Developer",
//     "childName": "Dev",
//     "mobileNumber" : "9328661966",
//     "email" : "qwerty.dev2020@gmail.com",
//     "password": "justdoit",
//     "conformPassword": "justdoit"
// }

// {
//     "parentID": "87pLOCbhmsR3TYe14hm4wKCxYN23",
//     "amount" : "93286",
//     "description" : "qwerty.dev"
// }