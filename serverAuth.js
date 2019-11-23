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
app.use(express.static('.'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  var presenceData = {
    user_id: 'unique_user_id',
    user_info: {
      name: 'Mr Channels',
      twitter_id: '@pusher'
    }
  };
  var auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
  console.log("user auth");
});

var port = process.env.PORT || 5050;
app.listen(port);