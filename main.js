$(document).ready(function() {


  var ttvUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  var ttvData = [];

  $('#testApi').on('click', function() {

    $.getJSON('https://wind-bow.gomix.me/twitch-api/users/freecodecamp?callback=?', function(data) {
      console.log(data);
    });

    $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/freecodecamp?callback=?', function(data) {
      console.log(data);
    });

    $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/freecodecamp?callback=?', function(data) {
      var x = data;
      console.log(x);
    });
  });

  $('#testArr').on('click', function() {
    ttvUsers.forEach(function(user) {
      
      var userData, channelData, streamData;

      var userPromise = $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + user + '?callback=?', function(data) {
        return data;
      });

      var channelPromise = $.getJSON('https://wind-bow.gomix.me/twitch-api/channels/' + user + '?callback=?', function(data) {
        return data;
      });

      var streamPromise = $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?', function(data) {
        return data;
      });

      $.when(userPromise, channelPromise, streamPromise)
        .done(function(userData, channelData, streamData) {
          ttvData.push({
            'userData': userData[0],
            'channelData': channelData[0],
            'streamData': streamData[0], 
            'username': userData[0].name, 
            'displayname': userData[0].display_name, 
            'logo': userData[0].logo,
            'bio': userData[0].bio, 
            'stream': streamData[0].stream
          });
        })
      ;

    });
    
    console.log(ttvData);
  });
    


});
