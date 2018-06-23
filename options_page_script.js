
var enableYoutubeCheckBox = document.getElementById("enableYoutubeCheckBox");
var enableYoutubePlayerPauseButton = document.getElementById("enableYoutubePlayerPauseButton");
var floatYoutubeViewOption = document.getElementById("floatYoutubeViewOption");
var enableYoutubeMiddleAddClose = document.getElementById("enableYoutubeMiddleAddClose");
var youtubeArray = [enableYoutubePlayerPauseButton, floatYoutubeViewOption, enableYoutubeMiddleAddClose];

helper_startupfunction("", function(){
    helper_getStorageVariablesFromSync([helper_obj.enableyoutube], function(result){
      if(result[helper_obj.enableyoutube] == true){
          enableYoutubeCheckBox.checked = true;
      }
      else{
          enableYoutubeCheckBox.checked = false;
      }
      enableDisableInputs(youtubeArray, enableYoutubeCheckBox.checked);
    });
    enableYoutubeCheckBox.onchange = function(){
      var data = {};
      data[helper_obj.enableyoutube] = enableYoutubeCheckBox.checked;
      saveStorage(data, function(){
          enableDisableInputs(youtubeArray, enableYoutubeCheckBox.checked);
          showToast("Saved Successfully");
      });
    }
    updateCheckBox(enableYoutubePlayerPauseButton, helper_obj.youtubepause);
    updateCheckBox(floatYoutubeViewOption, helper_obj.floatyoutube);
    updateCheckBox(enableYoutubeMiddleAddClose, helper_obj.middleaddclose);
    commonCheckBoxChangeFunction(enableYoutubePlayerPauseButton, helper_obj.youtubepause);
    commonCheckBoxChangeFunction(floatYoutubeViewOption, helper_obj.floatyoutube);
    commonCheckBoxChangeFunction(enableYoutubeMiddleAddClose, helper_obj.middleaddclose);
});

function commonCheckBoxChangeFunction(checkbox, option){
  checkbox.onchange = function(){
    var data = {};
    data[option] = checkbox.checked;
    saveStorage(data, function(){
        showToast("Saved Successfully");
    });
  }
}

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
