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
var isLogged = false;
var username = "";
var email, AuthID;
chrome.storage.local.get("UserInfo", function (session) {
    if (chrome.runtime.error) {
        console.log(chrome.runtime.error);

    } else {

        isLogged = session.UserInfo.isLogged;
        username = session.UserInfo.FullName;
        email = session.UserInfo.Email;
        AuthID = session.UserInfo.AuthID;

        if (!isLogged) {
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
                            //list += "<div class='container container_"+response.rows.item(i).grab_id+"'><div class='row'><div class='col-xs-12'><div class='card card-default'><div class='card-heading'><a class='text-danger cursor pull-right delete_grabdata' title='Delete'>x <input type='hidden' class='hidden_grabid' value='" + response.rows.item(i).grab_id + "'></a><h4>Title</h4></div><a href='grab.html?grab_id=" + response.rows.item(i).grab_id + "'><div class='card-body'><p style='color:#000000;'>" + response.rows.item(i).title + "</p></div></a></div></div></div></div>"
                            console.log(response.rows.item(i));
                            var device_grabid=response.rows.item(i).grab_id;
                            var device_img='';
                            var device_type=response.rows.item(i).device_type;
                            var added_on=response.rows.item(i).added_on;
                            if(device_type=="Android"){
                                device_img='<img src=\'img/android-16.png\'/>';
                            }else if(device_type=="Chrome"){
                                device_img='<img src=\'img/chrome-16.png\'/>';
                            }else if(device_type=="Firefox"){
                                device_img='<img src=\'img/firefox-16.png\'/>';
                            }else if(device_type=="IOS"){
                                device_img='<img src=\'img/apple-16.png\'/>';
                            }
                            var device_type = response.rows.item(i).device_type;
                            list+="<div class='container container_"+device_grabid+"'>\
                                    <div class='row'>\
                                    <div class='col-xs-12'>\
                                        <div class='card card-default'>\
                                            <div class='card-heading'>\
                                            <a class='text-danger cursor pull-right delete_grabdata' title='Delete'>\
                                            <img src='img/circle-cross-16.png'> \
                                            <input type='hidden' class='hidden_grabid' value='3'></a>\
                                            <div class='card_img'>\
                                            <img src='img/chrome-16.png' style='width: 30px;'> \
                                            <p class='card_title'>"+device_type+"</p>\
                                            <p class='card_date'>"+added_on+"</p></div></div>\
                                            <a href='grab.html?grab_id="+device_grabid+"'><div class='card-body'>\
                                            <p>"+response.rows.item(i).title+"</p>\
                                            </div>\
                                            </a></div></div>\
                                        </div>\
                                    </div>";
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

document.addEventListener('DOMContentLoaded', function() {

    setTimeout(function(){
        getIt();
    },500);
    var link="";
    function getIt(){

        $(".delete_grabdata").on('click',function(){
            var id = $(this).find(".hidden_grabid").val();
            if(id=='' || id=='-1'){
                console.log("Required Id not found");
            }else{
                var r = confirm("Are you sure..?")
                if(r == true){
                    $.ajax({
                        type:'delete',
                        url:pkgrabdelete+id,
                        dataType:'json',
                        success: function(response){
                            if(response.success){
                                console.log(response.result);
                                $(".container_"+id).slideUp();
                            }else{
                                console.log(response.result);
                            }
                        }
                    });
                }
            }
        });

    }
});