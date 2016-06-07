
var mongoose = require('mongoose');
var planModel = require('../models/userPlan.js');
var q = require('q');
var queryResolver = require('../lib/queryResolver.js');
require('mongoose-query-paginate');

var plans = {

    getUserPlan: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'planName'
        };
        var query;
        queryResolver.resolveQuery(req.query, planModel, options).then(function (response) {
            res.json(response);
        });
    },

    setUserPlan: function (data) {
        var deferred = q.defer();
        planModel.findByIdAndUpdate(data, { 'isLinkGenerated': true }, function (err, post) {
            if (err) console.log(err);
            deferred.resolve(post);
        });
        return deferred.promise;
    },

    copyPlan: function (req, res) {
        planModel.create({ planName: req.body.planName, owner: req.body.owner, coPlanners: req.body.coPlanners }, function (err, post) {
            if (err) return res.json(err);
            res.json(post);
        });
    },


    createPlan: function (req, res) {

        planModel.create({ planName: req.body.planName, owner: req.body.owner }, function (err, result) {
            if (err) {
                console.log("Error" + err);
            }
            else {
                res.json(result);
            }
        })
    },

    getOnePlan: function (req, res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'planName'

        };
        var query;
        queryResolver.resolveQuery(req.query, planModel, options).then(function (response) {
            res.json(response);
        });



    },

    createCoPlan: function (req, res) {
        var id = req.params.id;
        if (req.body.isUnderReview) {
            planModel.findByIdAndUpdate(id, { isUnderReview: req.body.isUnderReview }, function (err, result) {
                if (err) {
                    console.log("Error" + err);
                }
                else {
                    res.json(result);
                }
            })
        }


        if (req.body.reviewer) {
            planModel.findByIdAndUpdate(id, { reviewer: req.body.reviewer }, function (err, result) {
                if (err) {
                    console.log("Error" + err);
                }
                else {
                    res.json(result);

                    /* res.json({
                         "status": 201,
                         "message": "Updated Successfully",
                         "data" :result 
                     });
                     */


                }
            })
        }


        if (req.body.coPlanners) {
            planModel.findByIdAndUpdate(id, { coPlanners: req.body.coPlanners }, function (err, result) {
                if (err) {
                    console.log("Error" + err);
                }
                else {
                    res.json(result);
                }
            })
        }

    },

    updateReviewer: function (req, res) {
        var id = req.params.id;

        planModel.findByIdAndUpdate(id, { reviewer: req.body.reviewer, isUnderReview: req.body.isUnderReview }, function (err, result) {
            if (err) {
                console.log("Error" + err);
            }
            else {
                res.json(result);
            }
        })

    },

    deletePlan: function (req, res) {
        var id = req.params.id;
        planModel.findByIdAndUpdate(id, { 'markDelete': true }, function (result) {
            res.status(201);
            res.json({
                "status": 200,
                "message": "Delete Plan Successfully"
            })
        }, function (error) {
            console.log("Error in Deleting " + error);
        })

    },


    // santosh Method for API 

    getPlans: function (req, res) {
        var _pageNumber = 1,
            _pageSize = 10;

        planModel.find({}, null, {
            sort: {
                planName: 1
            }
        }).skip(_pageNumber > 0 ? ((_pageNumber - 1) * _pageSize) : 0).limit(_pageSize).exec(function (err, docs) {
            if (err)
                res.json(err);
            else
                res.json({
                    "TotalCount": docs.length,
                    "result": docs
                });
        });

    }




};



module.exports = plans;