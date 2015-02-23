/**
 * Created by Rafique on 18/2/2015.
 */

var LOGIN_URL="http://api.plickr.me/Login";
var POST_GRAB="http://api.plickr.me/User/Grab";
function PlickrNotify(){
           var notif_id="plickr0";
        chrome.notifications.clear(notif_id,function(){
            var options={type:'basic',iconUrl:'img/logo-128.png',title:'Added on your list',message:'Successfully Added On Your Plickr List'};
            chrome.notifications.create(notif_id,options,function(){});
        });
}
function NotifyUser(title,msg){

    var notif_id="plickr0";
    var options={type:'basic',iconUrl:'img/logo-128.png',title:title,message:msg};

    chrome.notifications.clear(notif_id,function(){
        chrome.notifications.create(notif_id,options,function(){});
    });

}function NotifyUserByID(notif_id,title,msg){

    var options={type:'basic',iconUrl:'img/logo-128.png',title:title,message:msg};

    chrome.notifications.clear(notif_id,function(){
        chrome.notifications.create(notif_id,options,function(){});
    });

}

function checkPermission(){
    chrome.notifications.getPermissionLevel(function(level){
        if(level=='granted'){
            return true;
        }else{
            alert("Please enable your desktop notification for better use of Plickr");
            return false;
        }
    });
}
/*
function getParamValue( str ){
    str = str.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regex = new RegExp( "[\\?&]*"+str+"=([^&#]*)" );
    var results = regex.exec( this );
    if( results == null ){
        console.log("Result notfound ");
        return "";
    } else {
        console.log("Result found "+results[1]);
        return results[1];
    }
}*/
function getParamValue(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}
function pageRedirect(name){
    window.location.replace(name);

}

function sendGrabData(obj){
    $.ajax({URL:POST_GRAB,dataType:'json',data:obj,type:'POST',onSuccess:function(res){
        console.log(res);
    }});
}
function sendXHRData(obj){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", POST_GRAB, true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", param.length);
    xhr.setRequestHeader("Connection", "close");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // JSON.parse does not evaluate the attacker's scripts.
            var resp = JSON.parse(xhr.responseText);
            console.log(resp);

        }
    };
    xhr.send(param);
}