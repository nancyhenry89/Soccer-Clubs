
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}
/*function setCurrentTeam(){
  sessionStorage.setItem('currentTeam', $(this).text());
}*/
function search() {

	console.log('Search Started');
  var apiKey = 'AIzaSyCr7L91URLBfmHfXeUiKPnUbmL0s9gikSY';
	var q = 'European Soccer '+sessionStorage.getItem('currentTeam');
	$('#currentTeam').text(q)
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
        isLoad = true;
    }); 	
    request = gapi.client.youtube.search.list({
				q: q,
        part: 'id, snippet',
        type: 'video',
        order: 'date',
        maxResults:	'10',

     });
    

  request.execute(function(response) {
    var str = response.result;
    sessionStorage.setItem('currentVid', str.items(0).id.videoId);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
} 



  // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        currentVid=sessionStorage.getItem('currentVid');
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: currentVid,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }


$(document).ready(function(){
  $('.teamList a').click(function(){
      sessionStorage.setItem('currentTeam', $(this).text());
      $('.teamList').hide();
      $('.matchList').show();
      search();
  });
  $('#back').click(function(){
      $('.matchList').hide();
        $('.teamList').show();

  });
});