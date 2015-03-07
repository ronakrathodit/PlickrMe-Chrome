/**
 * Created by Rafique on 17/2/2015.
 */

chrome.storage.local.get("pk", function (data) {
    if (chrome.runtime.error) {
        console.log(chrome.runtime.error);
    } else {
      if(data.pk.UserInfo.islogged){
          window.location.replace("dashboard.html");
      }
    }
});




