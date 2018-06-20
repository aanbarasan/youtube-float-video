
var storageVariables = [helper_obj.enableyoutube, helper_obj.youtubepause];

helper_startupfunction("youtube.com", function(){
	helper_getStorageVariablesFromSync(storageVariables, function(result){
		if(result[helper_obj.enableyoutube]){
			addYoutTubeKeyBoardFunctions(result);
			addYoutTubeContentChangeListener(result);

		}
	});
});

function addYoutTubeKeyBoardFunctions(result){
	var bodyTag = document.getElementsByTagName("body")[0];
	bodyTag.addEventListener("keypress", function(event){
		if(result[helper_obj.youtubepause]){
			if(event.code == "Space"){
				if(!(event.target.localName == "input" && event.target.type == "text")){
					var container = document.getElementById("player-container");
					var playButton = container.getElementsByClassName("ytp-play-button")[0];
					playButton.click();
					event.preventDefault();
				}
			}
		}
	});
}

function addYoutTubeContentChangeListener(result){
	// Select the node that will be observed for mutations
	var targetNode = document.getElementById('movie_player');

	// Options for the observer (which mutations to observe)
	var config = { attributes: true };

	// Callback function to execute when mutations are observed
	var callback = function(mutationsList) {
	    for(var mutation of mutationsList) {
			if (mutation.type == 'attributes') {
	            console.log('The ' + mutation.attributeName + ' attribute was modified.');
	            console.log(mutation);
	        }
	    }
	};

	// Create an observer instance linked to the callback function
	var observer = new MutationObserver(callback);

	// Start observing the target node for configured mutations
	// observer.observe(targetNode, config);

	// Later, you can stop observing
	// observer.disconnect();
}
