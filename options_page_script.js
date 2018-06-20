
var enableYoutubeCheckBox = document.getElementById("enableYoutubeCheckBox");
var enableYoutubePlayerPauseButton = document.getElementById("enableYoutubePlayerPauseButton");

helper_startupfunction("", function(){
    updateCheckBox(enableYoutubeCheckBox, helper_obj.enableyoutube);
    updateCheckBox(enableYoutubePlayerPauseButton, helper_obj.youtubepause);
    enableYoutubeCheckBox.onchange = function(){
      var data = {};
      data[helper_obj.enableyoutube] = enableYoutubeCheckBox.checked;
      saveStorage(data, function(){
          showToast("Saved Successfully");
      });
    }
    enableYoutubePlayerPauseButton.onchange = function(){
      var data = {};
      data[helper_obj.youtubepause] = enableYoutubePlayerPauseButton.checked;
      saveStorage(data, function(){
          showToast("Saved Successfully");
      });
    }
});

function updateCheckBox(checkbox, storagetext){
  helper_getStorageVariablesFromSync([storagetext], function(result){
      if(result[storagetext] == true){
          checkbox.checked = true;
      }
      else{
          checkbox.checked = false;
      }
  });
}
