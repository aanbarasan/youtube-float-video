
window.helper_obj = {};
window.helper_obj.startup = "helper_startUpText";
window.helper_obj.enableyoutube = "helper_enableYoutubeCheckBox";
window.helper_obj.youtubepause = "helper_enableYoutubePlayerPauseButton";
window.helper_obj.floatyoutube = "helper_floatYoutubeViewOption";
window.helper_obj.middleaddclose = "helper_enableYoutubeMiddleAddClose";


function helper_startupfunction(hostName, callback){
	var localHostName = window.location.hostname;
	if(localHostName && localHostName.endsWith(hostName)){
		helper_getStorageVariablesFromSync([helper_obj.startup], function(result){
			if(result[helper_obj.startup] == true){
				callback();
			}
			else{
				var data = {};
				data[helper_obj.enableyoutube] = true;
				data[helper_obj.youtubepause] = true;
				data[helper_obj.floatyoutube] = true;
				data[helper_obj.middleaddclose] = true;
				data[helper_obj.startup] = true;
				saveStorage(data, function(){
					callback();
				});
			}
		})
	}
}

function helper_getStorageVariablesFromSync(storageVariables, callback){
	chrome.storage.sync.get(storageVariables, function(result) {
		if(result){
			callback(result);
		}
	});
}

function saveStorage(data, callback){
  chrome.storage.sync.set(data, callback);
}

function showToast(text){
  var div = document.getElementById("fixedToastDiv");
  div.style.display = "none";
  setTimeout(function(){
    var divContent = document.getElementById("fixedToastContent");
    div.style.display = "block";
    divContent.innerText = text;
    setTimeout(function(){
      divContent.innerText = "";
      div.style.display = "none";
    },2000);
  },500);
}

function tryAgainWithTimeout(count, timeoutValue, callBack){
	if(count > 0){
		count = count - 1;
		setTimeout(function(){
			var result = callBack();
			if(result != true){
				tryAgainWithTimeout(count, timeoutValue, callBack);
			}
		}, timeoutValue);
	}
}

function enableDisableInputs(arr, option){
	for(var i=0;i<arr.length;i++){
		if(option != true){
    		arr[i].disabled=true;
		}
		else{
			arr[i].disabled=false;
		}
    }
}