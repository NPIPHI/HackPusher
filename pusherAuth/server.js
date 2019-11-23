var express = require('express');
    var bodyParser = require('body-parser');
    var Pusher = require('pusher');

    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    APP_ID = '905122';
    APP_KEY = '12786716ab78611990ac';
    APP_SECRET = 'b1155a704e9ff38b68a4';
    CLUSTER = 'us2';
    var pusher = new Pusher({ appId: APP_ID, key: APP_KEY, secret:  APP_SECRET, cluster: CLUSTER });

    app.post('/pusher/auth', function(req, res) {
      var socketId = req.body.socket_id;
      var channel = req.body.channel_name;
      var auth = pusher.authenticate(socketId, channel);
      res.send(auth);
    });

    app.post('/message', function(req, res) {
      var message = req.body.message;
      var name = req.body.name;
      pusher.trigger( 'private-chat', 'message-added', { message, name });
      res.sendStatus(200);
    });

    app.get('/',function(req,res){      
         res.sendFile('/public/index.html', {root: __dirname });
    });

    app.use(express.static(__dirname + '/public'));

    var port = process.env.PORT || 5000;
    app.listen(port, function () {
      console.log(`app listening on port ${port}!`)
    });