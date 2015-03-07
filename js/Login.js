/**
 * Created by Ronak on 2/17/2015.
 */

var display = $("#result");
var email = $("#inputEmail");
var password = $("#inputPassword");

$(function () {
    pk.browser_info();
    console.log(pk.browser_info());
    $("#login_button").on("click", function () {

        if (!validate_form()) {
            display.html("Please fill the required fields...").removeClass().addClass("alert alert-danger").show();
        } else {
            // {username:"rafique",devices:{devices:"moto",serial:"1256serial"}}

            var qry = {
                email: email.val(),
                password: password.val(),
                notify_id: pk.notify_id,
                device: {
                    device_name: pk.browser.name,
                    device_nickname: pk.browser.nickname,
                    device_id: pk.device_id,
                    "device_type": pk.browser.device_type
                }
            };
            display.html("Please wait...").removeClass().addClass("alert alert-info").show();
            $("#login_button").html("Please wait...");
console.log(qry);
            $.ajax({
                type: 'post',
                url: LOGIN_URL,
                data: qry,
                dataType: 'json',
                success: function (response) {

                    if (response.success) {
                        var obj = {
                            pk: {
                                UserInfo: {
                                    uid: response.info.uid,
                                    fullname: response.info.fullname,
                                    islogged: true,
                                    email: email.val()
                                }
                                , DeviceInfo: {
                                    device_id: response.info.device_id,
                                    device_name: pk.browser_info().name,
                                    device_nickname: pk.browser_info().nickname,
                                    device_type: "Chrome"
                                }
                            }

                        };
                        console.log("before insert");
                        console.log(obj);


                        chrome.storage.local.set(obj, function () {
                            if (chrome.runtime.error) {
                                NotifyUser("ERROR OCCURRED", "Unable to set your Authentication. Please try again");

                            } else {
                                NotifyUser("Welcome, " + response.info.fullname, "You have successfully Logged In");
                                this.isLogged = true;
                                setTimeout(function () {
                                    window.location.replace("dashboard.html");
                                }, 500);
                            }
                        });


                    } else {
                        display.html(response.result).removeClass().addClass("alert alert-danger").show();
                    }
                    setTimeout(function () {
                        display.slideUp();
                    }, 2000);
                    $("#login_button").text("Sign in");

                }
            });
        }
    });
});

function checkEmail(email) {
    var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (reg.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validate_form() {
    var total = $(".required").length;
    var c = 0;
    for (var i = 0; i < total; i++) {
        if ($(".required").eq(i).val() == "") {
            $(".required").eq(i).parent().removeClass("has-success").addClass("has-error");
            c++;
        } else {
            $(".required").eq(i).parent().removeClass("has-error");
        }
    }

    if (!checkEmail(email.val())) {
        email.parent().removeClass("has-success").addClass("has-error");
        c++;
    } else {
        email.parent().removeClass("has-error");
    }

    return (c > 0) ? false : true;

}