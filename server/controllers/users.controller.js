const user = require('../models/users.model')
const hash = require('password-hash');
const jwt  = require('jsonwebtoken');

module.exports = {

  // GET all users
  getAllUser : (req, res) => {
    user.find( {}, {__v : false}, (err, data) =>{
      res.send(data)
    })
  },

  // CREATE a user
  createUser : (req, res) => {
    user.findOne( {username : req.body.username}, (err, data) =>{
      // FIND if username already taken or not
      if(data) res.json({err: "Username already taken!"})
      // if username available, then ..
      else{
        let newUser = user({
          username : req.body.username,
          password : hash.generate(req.body.password)
        })
        newUser.save((err,create) =>{
          res.json({
            username : create.username,
            password : create.password
          })
        })
      }
    })
  },

  // LOGIN a user
  login : (req, res, next) => {
    user.findOne( { username: req.body.username } )
    .then( (login) => {
      if(!login){
        console.log(login);
        res.json({err: "user not found!"})
      }
      else if( hash.verify(req.body.password,login.password) ){
        console.log(login);
        let token = jwt.sign( {username: login.username}, process.env.SECRET, {expiresIn : 60*60});
        res.json( {
          username : login.username,
          // password : login.password,
          token    : token
        } );
      }
      else
          res.json({err : 'invalid username or password!'})
    })
  },

  // UPDATE a user
  updateUser : (req,res) => {
    user.findOneAndUpdate({_id: req.params.id},{
        username  : req.body.username,
        password  : hash.generate(req.body.password),
        updatedAt : new Date()
      }, { new : true }, (err, data) => {
    res.json({
      message : "User (below) has been updated",
      data : data})
    })
  },

  // DELETE a user
  deleteUser : (req, res) => {
    user.findOneAndRemove( {_id: req.params.id} ).then( (data) =>{
      res.json({
        message : "User (below) has been removed",
        data : data})
    })
  },

  // VERIFY a user
  verifyUser : (req, res, next) => {
    let decode = jwt.verify(req.header('token'), process.env.SECRET)

    if (decode)
        next()
    else {
        res.json({
          message : "you must login to access this page"
        })
    }
  }
}
