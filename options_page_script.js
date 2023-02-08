
var floatYoutubeViewOption = document.getElementById("floatYoutubeViewOption");
var floatYoutubeViewBannerSize = document.getElementById("floatYoutubeViewBannerSize");
var youtubeArray = [floatYoutubeViewOption, floatYoutubeViewBannerSize];

helper_startupfunction("", function(){
    updateCheckBox(floatYoutubeViewOption, helper_obj.floatyoutube);
    helper_getStorageVariablesFromSync([helper_obj.floatyoutube_bannersize], function(result){
        floatYoutubeViewBannerSize.value = result[helper_obj.floatyoutube_bannersize];
    });

    commonCheckBoxChangeFunction(floatYoutubeViewOption, helper_obj.floatyoutube);
    floatYoutubeViewBannerSize.onchange = function(){
        var data = {};
        data[helper_obj.floatyoutube_bannersize] = floatYoutubeViewBannerSize.value;
        saveStorage(data, function(){
            showToast("Saved Successfully");
        });
    }
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
