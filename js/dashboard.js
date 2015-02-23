/**
 * Created by Rafique on 17/2/2015.
 */
/*
var UserInfo=getLocalData("UserInfo");

console.log("Object Console");

console.log(""+UserInfo.isLogged);
console.log("Array Console");

console.log(UserInfo['isLogged']);

if(UserInfo.isLogged==true){
    username = UserInfo.FullName;
    email = UserInfo.Email;
    AuthID = UserInfo.AuthID;
}else {
    //window.location.replace("popup.html");

}
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



    if (storage != null || storage.size != 0) {
        $('.username').text(username);

        storage.webdb.grabAllData(function (txn, response) {
            var row_count = response.rows.length;
            if (row_count > 0) {
                var list = "";
                for (var i = 0; i < row_count; i++) {
                    list += "<tr><td class='col-xs-11 data_title_list'><a href='grab.html?grab_id=" + response.rows.item(i).grab_id + "'>" + response.rows.item(i).title + "<a/></td><td class='col-xs-1'><a class='text-danger' title='Delete?'>X</a></td></tr>";
                }
                $('.empty_list').hide();
                $('.data_list').html(list).show();
            } else {
                $('.data_list').hide();
                $('.empty_list').show();

            }

        });
    } else {
        $('body.container').html("<a href='dashboard.html' class='btn btn-danger'>Refresh</a>");
    }

});
    }
});