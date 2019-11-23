var Pusher = require('pusher');

var pusher = new Pusher({
  appId: '905122',
  key: '12786716ab78611990ac',
  secret: 'b1155a704e9ff38b68a4',
  cluster: 'us2',
  encrypted: true
});

pusher.trigger('my-channel', 'my-event', {
  "message": "https://prod.liveshare.vsengsaas.visualstudio.com/join?FCB2F85B74535E8734F4C45D704A81BE26D7"
}); 