var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/smartSchool', function(error) {
    if (error) {
        console.log('Error in Connection', error);
    } else {
        console.log("Connection to the database successfully established");
    }
});

