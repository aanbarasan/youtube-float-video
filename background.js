function openOrFocusOptionsPage() {
   try
   {
      var optionsUrl = chrome.runtime.getURL('options_page.html'); 
      chrome.tabs.query({}, function(extensionTabs) {
         var found = false;
         for (var i=0; i < extensionTabs.length; i++) {
            if (optionsUrl == extensionTabs[i].url) {
               found = true;
               console.log("tab id: " + extensionTabs[i].id);
               chrome.tabs.update(extensionTabs[i].id, {"selected": true});
            }
         }
         if (found == false) {
             chrome.tabs.create({url: "options_page.html"});
         }
      });
   }
   catch(e)
   {
      console.error(e);
   }
 }
 chrome.runtime.onConnect.addListener(function(port) {
   var tab = port.sender.tab;
   // This will get called by the content script we execute in
   // the tab as a result of the user pressing the browser action.
   port.onMessage.addListener(function(info) {
     var max_length = 1024;
     if (info.selection.length > max_length)
       info.selection = info.selection.substring(0, max_length);
       openOrFocusOptionsPage();
   });
 });
 
 // Called when the user clicks on the browser action icon.
 chrome.action.onClicked.addListener(function(tab) {
    openOrFocusOptionsPage();
 });