var mongoose=require('mongoose');
const _app=require('./config.js');
mongoose.connect('mongodb://'+_app.user+':'+_app.pwd+'@cluster0-shard-00-00-lemrd.mongodb.net:27017,cluster0-shard-00-01-lemrd.mongodb.net:27017,cluster0-shard-00-02-lemrd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',{useNewUrlParser: true});
var user = mongoose.model('users', { name: String, email:String, password:String,role:String });

// var dog = new pet({ name: 'Danny',breed:'German Shepherd',pet_id:1 });
// var user = new users({ name: 'julie',breed:'pomerenian',pet_id:2 });

//insert new record into the document


const express = require('express')
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/createUser', function (req, res) {
    console.log(req.body.name)

    let r=req
    // res.send(r.body);

    let l_user = new user(req.body);
    l_user.save(function (err) {
        res.send('User Created');
    });
//   dog.save(function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send('wowww')
//     }
//   });
  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
