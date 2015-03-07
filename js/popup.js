/**
 * Created by Rafique on 17/2/2015.
 */

var tollCheck=function(isLog){

        if(isLog){
            window.location.replace("dashboard.html");
        }else{
            window.location.replace("welcome.html");
        }

};

chrome.storage.local.get("pk", function (data) {
    if (chrome.runtime.error) {
        console.log(chrome.runtime.error);
    } else {
      if(data.pk.UserInfo.islogged){
          tollCheck(true);
      }else{
          tollCheck(false);
      }
    }
});




