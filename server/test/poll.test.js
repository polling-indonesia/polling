var chai = require('chai')
var should = chai.should()
var chaiHttp = require('chai-http')
chai.use(chaiHttp)
var tampung
var tampung2

describe('tes routing polling',function(){
  it('should return poll json when post /polls',function(done){
    chai.request('http://localhost:3000').post('/polls/timo').send(
      {
        title:"pemilu jakarta",
        desc:"pemilihan gubernur jakarta babak kedua",
      }
    ).end(function(err,res){
      res.body.should.have.deep.property('title','pemilu jakarta')
      tampung = res.body._id
      done()
    })
  })
  it('should return poll json when get /polls',function(done){
    chai.request('http://localhost:3000').get(`/polls`).end(function(err,res){
      res.body.should.have.lengthOf(1)
      done()
    })
  })
  it('should return poll json when get /polls',function(done){
    chai.request('http://localhost:3000').get(`/polls/${tampung}`).end(function(err,res){
      res.body.should.have.deep.property('title','pemilu jakarta')
      done()
    })
  })
  it('should add choice  when put /polls/:id/add',function(done){
    chai.request('http://localhost:3000').put(`/polls/${tampung}/add`).send({
      name:'Saltbae',
      desc:"tukang panggang",
      photo: "https://media1.popsugar-assets.com/files/thumbor/yXlp640Tn-VxbxP-vaiI2NKZjxA/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2017/01/09/880/n/1922507/17b90c6d5873edb1231823.18767920_edit_img_image_18019874_1483991626/i/What-Salt-Bae-Meme.jpg"
    }).end(function(err,res){
      tampung2 = res.body.choice[0]._id
      res.body.choice.should.have.lengthOf(1)
      done()
    })
  })
  it('should add vote to choice  when put /polls/:id/vote/:choiceid/:username',function(done){
    chai.request('http://localhost:3000').put(`/polls/${tampung}/vote/${tampung2}/timo`).end(function(err,res){
      res.body.choice[0].vote.should.have.lengthOf(1)
      done()
    })
  })
  it('should return: sudah vote jangan double vote when double vote ',function(done){
    chai.request('http://localhost:3000').put(`/polls/${tampung}/vote/${tampung2}/timo`).end(function(err,res){
      res.text.should.equal('sudah vote jangan double vote')
      done()
    })
  })
  it('should return: poll deleted ',function(done){
    chai.request('http://localhost:3000').delete(`/polls/${tampung}`).end(function(err,res){
      res.text.should.equal('poll deleted')
      done()
    })
  })
})
