var mongoose=require('mongoose');
const _app=require('./config.js');

mongoose.connect('mongodb://'+_app.user+':'+_app.pwd+'@cluster0-shard-00-00-lemrd.mongodb.net:27017,cluster0-shard-00-01-lemrd.mongodb.net:27017,cluster0-shard-00-02-lemrd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{useNewUrlParser: true});

var user = mongoose.model('users', { name: String, email:String, password:String,role:String });

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

app.post('/createUser', function (req, res) {
    let l_user = new user(req.body);
    l_user.save(function (err) {
        res.send('User Created');
    });
})

app.post('/login', function (req, res) {
  let l_user = req.body
  user.find(l_user,{"email":1,"name":2,"role":3},function(err,data){
    console.log(data[0])
    
    let l_data=JSON.stringify(data[0]);

    if(data.length){
      jwt.sign(l_data,'secret',
      (err,token)=>{
        console.log(token);
        res.status(200).json(token);
        res.send(token);
      })
    }
    else
      res.send('Invalid User Name or password')
  });
})
app.post('/verify',function(req,res){
  console.log(req.body)
  res.send(jwt.verify(req.body.jwt, 'secret'));
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
