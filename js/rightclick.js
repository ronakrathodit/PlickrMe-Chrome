/**
 * Created by Rafique on 14/2/2015.
 */

var username = "";
var email, AuthID, device_id;
var contextID = null;
var isLogged = false;
var dataSentCallback=function(pay,isSent){
    if(isSent){
        pay.synced=1;
        //     data={payloads:[{gid:0, uid:4, title:txt.substring(0,78)+"..", payload:txt,device_id:device_id,datatype:"txt",added_on:"2015-02-18"}]};
    }else{
        pay.synced=0;
        // data={payloads:[{gid:0, uid:4, title:txt.substring(0,78)+"..", payload:txt,device_id:device_id,datatype:"txt",added_on:"2015-02-18"}]};
    }
    pay.device_type="Chrome";pay.device_name="Chrome Browser"; pay.device_display_name="MOTO E";
    insertDB(pay);
};

chrome.storage.local.get("UserInfo", function (session) {
    if (chrome.runtime.error) {
        console.log(chrome.runtime.error);
    } else {
        if(session!=null&&session.length>0){
            isLogged = session.UserInfo.isLogged;
            username = session.UserInfo.FullName;
            email = session.UserInfo.Email;
            AuthID = session.UserInfo.AuthID;
            device_id = 1;
        }else{
            isLogged=false;
        }


    }
});

init();


$(function () {

});

function init() {
    if (contextID == null) {
        chrome.contextMenus.create(
            {
                title: "Plickr ME!",
                contexts: ["selection"],
                onclick: function(info, tab) {
                    var txt=info.selectionText;

                    var start_payloading=function(isLog){
                        if(isLog){
                            var pay={gid:0, uid:4, title:txt.substring(0,78)+"..", payload:txt,device_id:1,datatype:"txt",added_on:"2015-02-18"};
                            var data={payloads:[pay]};

                            sendGrabs(pay,dataSentCallback);
                        }else{

                            NotifyUser("You need to Login","You need to login to start adding list");
                        }
                    };

                    isUserLogged(start_payloading);

                }
            });
    }
}


function insertDB(txt) {
    if (storage != null || storage.size != 0) {
        storage.webdb.insertData(txt);
    } else {
        console.log("Background JS cannot identify storage");
    }
}
function sendGrabs(obj,callback) {
    var param = $.param(obj);
    console.log(param);
    $.ajax({
        type: 'post',
        url: POST_GRAB,
        data: param,
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                return callback(obj,true);
            } else {
                return callback(obj,false);
            }
        },
        error:function(jqXHR,txtStatus,errorThrown){
            NotifyUserByID("plickr_error","#"+jqXHR.status+" "+errorThrown,"Error occurred while syncing your recent Plicks with cloud. Retry Syncing Again ");
            return callback(obj,false);

        }
    });
}

function isUserLogged(callback){

    chrome.storage.local.get("UserInfo", function (session) {
        if (chrome.runtime.error) {
            return callback(false);
        } else {

            if(session!=null&&Object.keys(session).length>0){

                if(session.UserInfo.isLogged===true){
                    return callback(true);
                }else{
                    return callback(false);
                }
            }else{
                return callback(false);
            }

        }
    });
}

