var mongoose = require('mongoose');
var role = require('../models/role.js');
var q = require('q');
var roles = {
 
  createRole: function(req,res){
    
      role.create({roleCode:req.body.roleCode},function(err,result){
          if(err) return err;
          else{
              res.json(result);
              console.log(result);
             }
      })
      
  }
  
  
};
 

 
module.exports = roles;