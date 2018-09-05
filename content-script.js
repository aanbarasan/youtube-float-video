
var storageVariables = [helper_obj.enableyoutube, helper_obj.youtubepause, 
					helper_obj.floatyoutube, helper_obj.middleaddclose];

helper_startupfunction("youtube.com", function(){
	helper_getStorageVariablesFromSync(storageVariables, function(result){
		if(result[helper_obj.enableyoutube]){
			// addYoutTubeKeyBoardFunctions(result);
			startOnYoutubeFunction(result);
			floatYoutubeViewFunction(result);
		}
	});
});

function floatYoutubeViewFunction(result){
	if(result[helper_obj.floatyoutube]){ 
		tryAgainWithTimeout(5, 500, function(){
			var vidplayer = document.getElementById("player-container");
			if(vidplayer){
				var boudingRectAngle = vidplayer.getBoundingClientRect();
				vidplayer.style.width = boudingRectAngle.width+"px";
				vidplayer.style.height = boudingRectAngle.height+"px";
				vidplayer.style.position = "fixed";
				vidplayer.style.zIndex = "10000";
				return true;
			}
		});
	}
}

function startOnYoutubeFunction(result){
	if(result[helper_obj.middleaddclose]){
		tryAgainWithTimeout(5, 1000, function(){
		    var head = document.getElementsByTagName('head')[0];
			if(head != null){
				var css = '.ad-container { display : none !important; }';
			    var style = document.createElement('style');
				style.type = 'text/css';
				if (style.styleSheet){
				  // This is required for IE8 and below.
				  style.styleSheet.cssText = css;
				} else {
				  style.appendChild(document.createTextNode(css));
				}
				head.appendChild(style);
				return true;
			}
		});
	}
}

function addYoutTubeKeyBoardFunctions(result){
	var bodyTag = document.getElementsByTagName("body")[0];
	bodyTag.addEventListener("keypress", function(event){
		if(result[helper_obj.youtubepause]){
			if(!((event.target.localName == "input" || event.target.localName == "textarea")
					&& (event.target.type == "text" || event.target.type == "textarea"))){
				if(event.charCode == 32){
					var vid = document.getElementsByClassName("html5-main-video")[0];
					if(vid.paused == true){
						vid.play();
					}
					else{
						vid.pause();	
					}
					event.preventDefault();
				}
			}
		}
	});
}

