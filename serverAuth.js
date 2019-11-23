var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '905122',
  key: '12786716ab78611990ac',
  secret: 'b1155a704e9ff38b68a4',
  cluster: 'us2',
  useTLS: true
});

var app = express();
app.use(express.static(`${__dirname}`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pusher/auth', function (req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: userID,
    user_info: {
      name: 'User ' + userID,
      twitter_id: '@pusher'
    }
  };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
  console.log("user auth:", "User " + userID);
  userID++;
});

var userID = 0;
var port = process.env.PORT || 5050;
app.listen(port);