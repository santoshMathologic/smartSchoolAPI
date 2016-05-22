var express = require('express');
var multer = require('multer')
var upload = multer()
var router = express.Router();
var mongoose = require('mongoose');
var Upload = require('../models/Upload.js');
var trainListRoute = require('./train.js');
var trainStationListRoute = require("../models/trainStation.js");
var fs = require('fs');
var CSV = require('csv-string');
var Q = require('q');


var trainListArray = [];




function UploadData(data, dataType, fileType, originalFileName, uploadedBy) {
    this.data = data;
    this.dataType = dataType;
    this.fileType = fileType;
    this.originalFileName = originalFileName;
    this.uploadedBy = uploadedBy;
}


var Uploads = {
    getAllUploads: function (req, res) {
        Upload.find({}, { "dataType": true, "fileType": true, "originalFileName": true, "uploadedBy": true, "isProcessed": true, "status": true }, function (err, allUploads) {
            if (err) return res.json(err);
            res.json(allUploads);
        });
    },
    getOneUpload: function (req, res, next) {
        var id = req.params.id;
        Upload.findById(id, function (err, post) {
            if (err) {
                return next(err);
            }
            res.json(post);
        });
    },

    getUploadByName: function (req, res, next) {
        var name = req.params.name;
        Upload.find({ name: new RegExp('^.*' + req.params.name + '.*$', "i") }, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    },

    processData: function (req, res) {

        console.log(req.body.dataType);

        switch (req.body.dataType) {

            case "Traindetail":
                Upload.findById(req.params.id, function(err, post) {
                    if (err) return err;
                    var data = post.data;
                    parseTrainDetails(data).then(function(result) {
                        updateUpload(req.params.id).then(function(result) {
                            res.json("Upload Successfull");
                        },
                            function(error) {
                                console.log(error);
                            });
                    }, function(error) {
                        console.log(error);
                    });

                });


                break;


            case "TrainStation":
            

                break;



        }


    },





    createUpload: function (req, res, next) {
        var originalfilename = req.file.originalname;
        var file = __dirname + "/" + req.file.name;
        var filePath = req.file.path;
        var dataType = req.body.dataType;
        var fileType = req.body.fileType;
        var fileType = req.body.fileType;
        var username = req.body.username;

        fs.readFile(filePath, function (error, data) {
            if (error) {
                return console.error("Error in reading File", error);
            } else {

                fs.writeFile(file, data, function (error, response) {
                    if (error) {
                        return console.error("Error in Writing File", error);
                    } else {
                        var uploadbulk = new UploadData(data, dataType, fileType, originalfilename, username);
                        Upload.create(uploadbulk, function (err, post) {
                            if (err) return next(err);
                            res.json(post.id);
                        });
                    }


                });
            }
            console.log("Asynchronous read: " + data);
        });



    },
    updateUpload: function (req, res, next) {
        var updateUpload = req.body;
        var id = req.params.id;
        Upload.findByIdAndUpdate(id, updateUpload, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    },

    deleteUpload: function (req, res, next) {
        var id = req.params.id;
        var deleteNewUpload = req.body;
        Train.Upload(id, deleteNewUpload, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    },
};





function pushDataToArray(trainNo, trainName, fromStation, toStation, runningDays, trainType, locoType) {
    trainListArray.push({
        trainNo: trainNo,
        trainName: trainName,
        fromStation: fromStation,
        toStation: toStation,
        runningDays: runningDays,
        trainType: trainType,
        locoType: locoType

    })

}

module.exports = Uploads;