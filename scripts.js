
// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

function search() {

	console.log('Search Started');
  var apiKey = 'AIzaSyCr7L91URLBfmHfXeUiKPnUbmL0s9gikSY';
	var q = 'European Soccer '+$('#query').val();
	
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function() {
        isLoad = true;
    }); 
	console.log('Search Request');
	
    request = gapi.client.youtube.search.list({
				q: 'q',
        part: 'id, snippet',
        type: 'video',
        order: 'date',
        maxResults:	'10',

     });
    

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
} 

