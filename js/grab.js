/**
 * Created by Rafique on 17/2/2015.
 */
var isLogged=false;
var username = "";
var email,AuthID;
chrome.storage.local.get("UserInfo",function(session){
    if (chrome.runtime.error) {
        console.log(chrome.runtime.error);

    }else{

        isLogged=session.UserInfo.isLogged;
        username = session.UserInfo.FullName;
        email = session.UserInfo.Email;
        AuthID = session.UserInfo.AuthID;

        if(!isLogged){
            window.location.replace("popup.html");
        }

        $(function () {

var grab_id=getParamValue("grab_id");
$('.username').text(username);

if(grab_id=="") {
    $('.container').html("Missing Field Required! Please go back to <a href='dashboard.html'>Dashboard</a> and try again");
}else{
    var g_title=$('.grab_title');
    var g_payload=$('.grab_payload');
    var g_added_on=$('.grab_date');
    var g_isSynced=$('.grab_synced');
    var g_added_using=$('.grab_using');

    storage.webdb.grabData(grab_id,function(txn,response){
        var row_count=response.rows.length;
        console.log("Data found :"+row_count);
        if(row_count>0){

            g_title.html(response.rows.item(0).title);
            g_payload.html(response.rows.item(0).payload);
            g_added_on.html(response.rows.item(0).added_on);
            var isSynced=response.rows.item(0).synced;
            g_isSynced.html((isSynced==1)?"<i>Synced</i>":"<a class='start_sync cursor'><i>Not Synced</i></a>");
            var added_using=response.rows.item(0).device_type;
            if(added_using=="Chrome"){
                g_added_using.html("<img src='img/chrome-16.png'/>");
            }else if(added_using=="Firefox"){
                g_added_using.html("<img src='img/firefox-16.png'/>");
            }else if(added_using=="Android"){
                g_added_using.html("<img src='img/android-16.png'/>");
            }else if(added_using=="IOS"){
                g_added_using.html("<img src='img/apple-16.png'/>");
            }else{
                g_added_using.html("Unknown Device");
            }

        }else{


        }

    });
}
    });
    }
});