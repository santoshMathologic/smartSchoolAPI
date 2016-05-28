
var jwt = require('jwt-simple');
var mongoose = require('mongoose');
var userModel = require('../models/user.js');
var roleRoute = require('./role.js');
//var md5 = require("./md5"),
var q = require('q');

var auth = {


    login: function (req, res) {
        var dbUserObj = {};


        var username = req.body.username;
        var password = req.body.password;

        if (username == '' || password == '') {
            res.status(401);
            res.json({
                'status': 401,
                'message': 'Invalid Credential'

            });
            return;
        }

        auth.validate(username, password).then(function (result) {
            if (result.role === undefined) { // If authentication fails, we send a 401 back
                res.status(403);
                res.json({
                    "result": false,
                    "status": "LOGINFAIL",
                    "message": "Invalid username or password"
                });
                return;
            }
            else {

                // If authentication is success, we will generate a token
                // and dispatch it to the client
                var token = genToken(result);
                res.cookie('x-access-token', token.token, { expires: new Date(token.expires) });
                res.cookie('x-key', token.user.username);
                res.json(token);
            }
        });

    },


    validate: function (username, password) {
       
        var deferred = q.defer();
        userModel.find({ userName: username, password: password }, function (error, result) {

            if (error) {
                console.log(error);
                return error;
            }

            if (result.length > 0) {

                dbUserObj = { // spoofing a userobject from the DB. 
                    name: username,
                    role: result[0]._doc.roleCode,
                    username: username,
                };
                deferred.resolve(dbUserObj);
            }

            else {
                dbUserObj = { role: undefined };
                deferred.resolve(result);
            }


        });

        return deferred.promise;
    },




}

// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());

    return {
        token: token,
        expires: expires,
        user: user
    };
};

function expiresIn(numDays) {
    var dateObj = new Date();
    console.log(dateObj.getDate());
    var newSetDate = dateObj.setDate(dateObj.getDate() + numDays);
    return newSetDate;
}


module.exports = auth;

