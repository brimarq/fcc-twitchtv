$(document).ready(function() {


  var ttvUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  var ttvData = [];

  function buildList(arr) {
    arr.forEach(function(e) {
      $('#user-list').append(
        '<a href="' + e.url +'" target="_blank" class="list-group-item list-group-item-action flex-column flex-wrap list-group-item-success"><div class="media align-items-center"><img class="mr-3" src="' + e.logo + '" alt="logo"><div class="media-body"><div class="d-flex w-100 flex-wrap justify-content-between"><h5 class="mt-0">' + e.name + '</h5><small><span class="badge badge-pill py-1 badge-success">ONLINE</span></small></div><em>' + e.stream.game + e.stream.status + '</em></div><!-- .media-body --></div><!-- .media --></a>'
      );
    });
  }

// How to run funcs inside of append()?



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
          // 'userData': userData[0],
          // 'channelData': channelData[0],
          // 'streamData': streamData[0], 
          'name': userData[0].display_name, 
          'logo': userData[0].logo, 
          'url': channelData[0].url,
          'stream': function() {
            if (!streamData[0].stream) {
              return {
                'game': '', 
                'status': ''
              }
            }
            return {
              'game': streamData[0].stream.game + ': ', 
              'status': streamData[0].stream.channel.status
            }
          }() 
        }); // ttvData.push() end
        
      }); // // $.when().done() end
      
    }); // ttvUsers.forEach() end

    console.log(ttvData);
    buildList(ttvData); // Doesn't work on first click - WTF?
    
  }); // $('#testArr').on('click') end
    
  

});
