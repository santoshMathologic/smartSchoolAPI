var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
var fileName = "";
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express Running on the 4000' });
});





var multer = require('multer');
var upload = multer({dest: './uploads'});
var newUpload = require('./Upload.js');

var trainList = require('./train.js');
var trainStation = require('./trainStation.js');
var auth = require('./auth.js');
var role = require('./role.js');
var plans = require('./userPlan.js');
var user = require('./user.js');
var classApi = require('./classTable.js');







//router.post('/register',auth.registerUser);

/*
 * Routes that can be accessed only by autheticated users
 */









/*
 * router call for Plans 
 * 
 */


router.get('/api/plans', plans.getUserPlan);
router.get('/api/plans/getOnePlan',plans.getOnePlan);
router.post('/api/plan/', plans.createPlan);
router.put('/api/coPlan/:id', plans.createCoPlan);
router.put('/api/plan/updateReviewer/:id', plans.updateReviewer);
router.put('/api/plan/deletePlan/:id', plans.deletePlan);
router.post('/api/copyPlan',plans.copyPlan);

/**
 *  Routes for Plans By santosh 
 * 
 */
router.get('/api/v1/plans/getPlans',plans.getPlans);


router.get('/api/newUploads', newUpload.getAllUploads);
router.get('/api/newUpload/:id', newUpload.getOneUpload);
router.get('/api/newUpload/:name', newUpload.getUploadByName);
router.post('/api/newUpload/',upload.single('file'), newUpload.createUpload);
router.post('/api/newUpload/:id', newUpload.processData);
router.put('/api/newUpload/:id', newUpload.updateUpload);
router.delete('/api/newUpload/:id', newUpload.deleteUpload);



// routes for TrainList 


router.post('/api/trainList', trainList.createTrainList);
router.get('/api/trainLists', trainList.getTrainList);




/// routes for TrainStations

//router.get('/api/v1/trainStation/:trainNo', trainStation.findTrain);
router.get('/api/v1/trainStation', trainStation.findTrain);
router.get('/api/v1/trainStations', trainStation.getTrainStations);
router.get('/api/v1/trainStations/getStations', trainStation.getTrainStation);

// routes for login
router.post('/login',auth.login);



// routes for Role

router.post('/api/v1/role', role.createRole);
router.get('/api/v1/roles', role.findSelectedColumn);



/*
 * Routes that can be accessed only by authenticated & authorized users
 */

router.get('/api/v1/admin/users', user.getUsers);
router.put('/api/v1/admin/user/', user.updateUser);
router.put('/api/v1/admin/user/:id', user.deleteUser);
router.post("/api/v1/admin/user/create",user.createUser);
router.get("/api/v1/admin/user/findUser",user.findUser);




// class Api
router.post('/api/v1/class/createClass', classApi.createClass);
router.get('/api/v1/class/classes', classApi.getClasses);
router.put('/api/v1/class/Updateclass/', classApi.updateClass);
router.put('/api/v1/class/deleteClass/:id', classApi.deleteClass);




module.exports = router;
