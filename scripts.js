
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}
/*function setCurrentTeam(){
  localStorage.setItem('currentTeam', $(this).text());
}*/
function search() {

  var apiKey = 'AIzaSyCr7L91URLBfmHfXeUiKPnUbmL0s9gikSY';
	var q = 'Soccer '+localStorage.getItem('currentTeam');
    gapi.client.setApiKey(apiKey);

    gapi.client.load('youtube', 'v3', function() {
            request = gapi.client.youtube.search.list({
				q: q,
        part: 'id, snippet',
        type: 'video',
        order: 'date',
        maxResults:	'10',
        videoEmbeddable:true,

     });
    

  request.execute(function(response) {
    var str = response.result;
    localStorage.setItem('result', JSON.stringify(str.items));
    //   window.location.href = './matchList.html';
  });
    }); 	


} 

function changeVidId(){
  $('#player').attr('src','https://www.youtube.com/embed/'+localStorage.getItem('currentVid'))
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
        currentVid=localStorage.getItem('currentVid');
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
  var result=JSON.parse(localStorage.getItem('result'));
  localStorage.setItem('currentVid', result[0].id.videoId);
        changeVidId();
     for (i=0;i<result.length;i++){
       $('#list').append("<div id='"+result[i].id.videoId+"' class='vidItem'><img src='"+result[i].snippet.thumbnails.default.url+"' /><span>"+result[i].snippet.title+"<span></div>")
    }
$("#list div").click(function(){
    localStorage.setItem('currentVid', $(this).attr('id'));
      changeVidId();
});
  $('#currentTeam').text(localStorage.getItem('currentTeam'));
    $('.teamList a').click(function(){
      localStorage.setItem('currentTeam', $(this).text());
       search();   
  });
   

});