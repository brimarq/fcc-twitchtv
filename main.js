$(document).ready(function() {

  const ttvUsers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  function createListItem(data) {
    var html = '';
    var streaming = true;

    if (!data.stream) {
      streaming = false;
    }

    html += '<a href="';
    html += data.url; 
    html += '" target="_blank" class="list-group-item list-group-item-action flex-column flex-wrap ';
    if (streaming) {
      html += 'list-group-item-success">';
    } else {
      html += 'list-group-item-secondary">';
    }
    html += '<div class="media align-items-center">'
    html += '<img class="mr-3" src="';
    html += data.logo;
    html += '" alt="logo">';
    html += '<div class="media-body">';
    html += '<div class="d-flex w-100 flex-wrap justify-content-between">';
    html += '<h5 class="mt-0">';
    html += data.name;
    html += '</h5>';
    html += '<small><span class="badge badge-pill py-1 ';
    if (streaming) {
      html += 'badge-success">ONLINE</span></small></div>';
      html += '<em>'; 
      html += data.stream; 
      html += '</em>';
    } else {
      html += 'badge-secondary">OFFLINE</span></small></div>';
    } 
    html += '</div><!-- .media-body --></div><!-- .media --></a>';
    $('#user-list').append(html);
  }




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

        let ttvData = {
          // 'userData': userData[0],
          // 'channelData': channelData[0],
          // 'streamData': streamData[0], 
          'name': userData[0].display_name, 
          'logo': userData[0].logo, 
          'url': channelData[0].url,
          'stream': function() {
            if (!streamData[0].stream) {
              return null;
            }
            return streamData[0].stream.game + ': ' + streamData[0].stream.channel.status
          }() 
        }; 

        console.log(ttvData);
        createListItem(ttvData);
        ttvData = {};

      }); // // $.when().done()
      
    }); // ttvUsers.forEach()
    
  }); // $('#testArr').on('click') 

  // $('#option1').on('click', function() {
  //   $('#user-list > .list-group-item').show();
  // });

  // $('#option2').on('click', function() {
  //   $('#user-list > .list-group-item-secondary').hide();
  // });

  // $('#option3').on('click', function() {
  //   $('#user-list > .list-group-item-success').hide();
  // });

  $('input[type="radio"][name="selectStreams"]').change(function() {
    if (this.value == 'all') {
      $('#user-list').find('a.list-group-item').show();
    }
    else if (this.value == 'online') {
      $('#user-list').find('a.list-group-item-success').show();
      $('#user-list').find('a.list-group-item-secondary').hide();
    } 
    else if (this.value == 'offline') {
      $('#user-list').find('a.list-group-item-secondary').show();
      $('#user-list').find('a.list-group-item-success').hide();
    }
  });
    
}); // document.ready()

