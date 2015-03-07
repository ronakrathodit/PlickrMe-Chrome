/**
 * Created by Ronak on 3/4/2015.
 */

var pk = {};
pk.generate = {};
pk.device_id=(localStorage.getItem("device_id")==""||localStorage.getItem("device_id")==null)?"":localStorage.getItem("device_id");
pk.isRegistered=false;
pk.notify_id="";
chrome.storage.local.get("gcm",function(GCM){
    if(chrome.runtime.error){
        console.log("Runtime error while retrieve GCM");
        pk.notify_id="";
    }else{
        pk.isRegistered=(GCM.gcm.registered!=null||GCM.gcm.registered!="")?GCM.gcm.registered:false;
        pk.notify_id=GCM.gcm.gcm_id;
    }
});
var senderIds = ["362496581007"];
pk.browser = {};
pk.browser.device_type="Chrome";
pk.browser_info = function () {

    if (navigator.userAgent.indexOf("Chrome") != -1) {
        pk.browser.name = "Chrome";

    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        pk.browser.name = "Mozilla Firefox";
    } else {
        pk.browser.name = "unknown";
    }

    if (navigator.userAgent.indexOf("Windows") != -1) {
        pk.browser.os = "Windows";

    } else if (navigator.userAgent.indexOf("Mac") != -1) {
        pk.browser.os = "Mac";
    } else {
        pk.browser.os = "unknown";
    }

    if (pk.browser.name != "unknown") {
        pk.browser.nickname = pk.browser.name;
        pk.browser.nickname += (pk.browser.os != "unknown") ? " for " + pk.browser.os : "";
    } else {
        pk.browser.nickname = "unknown";
    }
    return pk.browser;
};

pk.generate.uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    });
};

pk.user={};
pk.user.info={};
pk.user.device={};
var obj = {
    pk:{
        UserInfo: {
            uid: 0,
            fullname: "",
            islogged: false,
            email: ""
        }
        , DeviceInfo: {
            device_id: pk.device_id,
            device_name: pk.browser_info().name,
            device_nickname: pk.browser_info().nickname,
            device_type: "Chrome"
        }
    }

};
chrome.storage.local.get("pk", function (session) {
    if (chrome.runtime.error) {
        console.log(chrome.runtime.error);
    } else {
        console.log("SESSION PK");console.log(session);
        if (session != null && session.length > 0) {
           pk.user=session.pk.UserInfo;
           pk.user.device=session.pk.DeviceInfo;
        }else{
            chrome.storage.local.set(obj,function(){
                if (chrome.runtime.error) {
                    NotifyUser("ERROR OCCURRED", "Initialization Error. Restart Plickr.");

                }
            });
       }
    }
});

function registerCallback(registrationId) {
    if (chrome.runtime.lastError) {
        // When the registration fails, handle the error and retry the
        // registration later.
        return;
    }
    // Send the registration ID to your application server.
    sendRegistrationId(function(succeed) {
        console.log("registerCallback 2 id "+succeed);
        // Once the registration ID is received by your server,
        // set the flag such that register will not be invoked
        // next time when the app starts up.
        if (succeed)
            chrome.storage.local.set({gcm:{gcm_id:registrationId,registered: true}});
    });
}

function sendRegistrationId(callback) {
    console.log("sendRegistrationId  func "+callback);

    callback(true);
    // Send the registration ID to your application server
    // in a secure way.
}

chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get("gcm", function(result) {
        // If already registered, bail out.
        console.log(result);
        if (result.gcm.registered)

            return;

        // Up to 100 senders are allowed.

        chrome.gcm.register(senderIds, registerCallback);
    });
});
