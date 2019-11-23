
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('12786716ab78611990ac', {
      cluster: 'us2',
      forceTLS: true
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      //alert(JSON.stringify(data));
      let addedDiv = document.createElement("div");
      addedDiv.innerHTML = JSON.stringify(data);
      document.body.appendChild(addedDiv);
    });