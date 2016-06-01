var mongoose = require('mongoose');
var classModel = require('../models/class_table.js');
var q = require('q');
var queryResolver = require('../lib/queryResolver.js');
require('mongoose-query-paginate');

var classes = {
    createClass: function (req, res) {
        classModel.create({ class_Name: "className" }, function (err, result) {
            if (err) return err;
            else {
                res.json(result);
                console.log(result);
            }
        })
    },

    getClasses: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'class_Name'
        };
        var query;
        queryResolver.resolveQuery(req.query, classModel, options).then(function (response) {
            res.json(response);
        });

    },
    updateClass: function (req, res) {
        classModel.findByIdAndUpdate(req.body._id, { 'userName': req.body.userName, 'firstName': req.body.firstName, 'lastName': req.body.lastName, 'password': req.body.password, 'email': req.body.email, 'roleCode': req.body.roleCode }).then(function (result) {
            res.status(201);
            res.json({
                "status": 200,
                "message": "Update Successfully"
            })
        }, function (error) {
            console.log(error);
        })
    },

    deleteClass: function (req, res) {
        var id = req.params.id;
        classModel.findByIdAndUpdate(id, { 'markDelete': true }, function (result) {
            res.status(201);
            res.json({
                "status": 200,
                "message": "delete Successfully"
            })
        }, function (error) {
            console.log("error" + error);
        })
    }
};


module.exports = classes;