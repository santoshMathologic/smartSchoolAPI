var mongoose = require('mongoose');
var trainstation = require('../models/trainStation.js');
var q = require('q');
var queryResolver = require('../lib/queryResolver.js');
require('mongoose-query-paginate');


var trainStations = {
    createTrainStation: function (data) {
        var deferred = q.defer();
        trainstation.insertMany(data, function (err, post) {
            if (err) return err;
            //  console.log(post);
            deferred.resolve(post);
        });
        return deferred.promise;
    },

  findTrainByNumber: function (req, res) {
        trainstation.find({ 'trainNo': req.params.trainNo }, function (error, result) {
            if (error) return error;
            else if (result.length == 0) {
                res.json({
                    "message": "Train Not Found"
                })
            }
            else {
                res.json(result);
            }
        });
        return res;
    },


  findTrain: function (req,res) {
        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1
       };
        var query;
        queryResolver.resolveQuery(req.query, trainstation, options).then(function(response) {
            res.json(response);
        });
    },
  

    deleteTrainStations: function (data) {
        var deferred = q.defer();
        trainstation.remove({ trainNo: { $in: data } }, function (err, docs) {
            if (err) console.log(err);
            deferred.resolve(docs);
        });
        return deferred.promise;
    },
     getTrainStations: function (req, res) {

        var options = {
            perPage: parseInt(req.query.limit) || 10,
            page: parseInt(req.query.page) || 1,
            order: req.query.order || 'stopNo',
            trainup: req.query.trainup,
            traindown: req.query.traindown
        };
        
        trainstation.find({trainNo: { $in: [options.trainup, options.traindown] } }, function (err,post) {
            
            if (err) console.log(err);
             res.json(post);

        });

        

    },



};
module.exports = trainStations;