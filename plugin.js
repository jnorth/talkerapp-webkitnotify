plugin.onLoaded = function(){
  var icon = 'http://a.sublink.ca/favicon.png';
  var time = 5000;

  var notify = function(title, message) {
    // Desktop nofications not supported
    if (!window.webkitNotifications) {
      return false;
    }

    // Desktop notifications are enabled
    else if (window.webkitNotifications.checkPermission() == 0) {
      var n = window.webkitNotifications.createNotification(icon, title, message);
      n.show();
      setTimeout(function(){
        n.cancel();
      }, time);
    }
  };

  plugin.onBlur = function() {
    plugin.onLeave = function(event) {
      notify(event.user.name, 'has left the room.');
    };

    plugin.onJoin = function(event) {
      notify(event.user.name, 'has entered the room.');
    };

    plugin.onMessageReceived = function(event) {
      notify(event.user.name, event.content);
    };
  };

  plugin.onFocus = function() {
    plugin.onLeave = function(){};
    plugin.onJoin = function(){};
    plugin.onMessageReceived = function(){};
  };

  plugin.onMessageSend = function(event) {
    if (event.content == '/notify') {
      Talker.getMessageBox().val('');
      window.webkitNotifications.requestPermission(function(){
        notify('Talker App', 'Desktop notifications are now enabled.', true);
      });
      return false;
    }
  };
};