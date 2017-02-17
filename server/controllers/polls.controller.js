const Poll = require('../models/poll')
var mongoose = require('mongoose')

module.exports={
  create: function(req,res){
    let newPoll = new Poll({
      title: req.body.title,
      desc: req.body.desc,
      createdBy:{
        username:req.params.username
      },
      choice:[],
      alreadyvote:[],
      open:false
    })

    newPoll.save(function(err){
      if(err){
        res.send(err)
      }
      else{
        res.json(newPoll)
      }
    })
  },
  showAll: function(req,res){
    Poll.find({},function(err,result){
      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
    })
  },
  show: function(req,res){
    Poll.findOne({_id:req.params.id},function(err,result){
      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
    })
  },
  addChoice:function(req,res){
    Poll.findOne({_id:req.params.id},function(err,p){
      if(err){
        res.send('gagal')
      }
      else{
        p.choice.push({
          _id:mongoose.Types.ObjectId(),
          name:req.body.name,
          desc:req.body.desc,
          photo:req.body.photo,
          vote:[]
        })
        p.markModified('choice')
        p.save(function(err){
          if(err){
            res.send(err)
          }
          else{
            res.json(p)
          }
        })
      }
    })
  },
  voteChoice: function(req,res){
    var arr
    var check = false
    var check2 = false
    Poll.findOne({_id:req.params.id},function(err,pol){
        pol.choice.forEach(function(cho){
          if(cho._id==req.params.choiceid)
          arr = cho
        })
        arr.vote.forEach(function(result){
          if(result.username==req.params.username){
            check = true
          }
        })
        pol.alreadyvote.forEach(function(result){
          if(result.username == req.params.username){
            check2 = true
          }
        })
        if(check == false && check2 == false){
          arr.vote.push({username:req.params.username})
          pol.alreadyvote.push({username:req.params.username})
          pol.markModified('choice')
          pol.markModified('alreadyvote')
          pol.save(function(err){
            if(err){
              res.send(err)
            }
            else{
              res.json(pol)
            }
          })
        }
        else{
          res.send('sudah vote jangan double vote')
        }
    })
  },
  delete: function(req,res){
    Poll.findOneAndRemove({_id:req.params.id},function(err){
      res.send("poll deleted")
    })
  },
  open: function(req,res){
    Poll.findOne({_id:req.params.id},function(err,result){
      result.open = true
      result.markModified('open')
      result.save(function(err){
        if(err){
          res.send(err)
        }
        else{
          res.json(result)
        }
      })
    })
  },
  close: function(req,res){
    Poll.findOne({_id:req.params.id},function(err,result){
      result.open = false
      result.markModified('open')
      result.save(function(err){
        if(err){
          res.send(err)
        }
        else{
          res.json(result)
        }
      })
    })
  }

}
