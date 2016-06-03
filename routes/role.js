var mongoose = require('mongoose');
var role = require('../models/role.js');
var q = require('q');
var roles = {

    createRole: function (req, res) {

        role.create({ roleCode: req.body.roleCode }, function (err, result) {
            if (err) return err;
            else {
                res.json(result);
                console.log(result);
            }
        })
    },

    findSelectedColumn: function (req, res) {
        
        /**
         *   for Retrive single colum just provide column name
         *   with their initial values such as
         *   {roleCode:"admin",privilegeCode:"other"} etc
         * 
         */
        
        role.find({}, {roleCode:"admin"}, function (err, result) {
            if (err) return err;
            else {
                res.json(result);
            }
        })
      }


};
module.exports = roles;