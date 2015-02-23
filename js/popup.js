/**
 * Created by Rafique on 17/2/2015.
 */
var bg=chrome.extension.getBackgroundPage();
var tollCheck=function(isLog){
    if(isLog){
        window.location.replace("dashboard.html");
    }
};
bg.isUserLogged(tollCheck);




