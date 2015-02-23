$(function(){
    $("#btn_register").on('click',function(){

        var total = $(".required").length;
        var c=0;

        for(var i=0;i<total;i++){
            if($(".required").eq(i).val()=="" || $(".required").eq(i).val()=="-1"){
                $(".required").eq(i).parent().removeClass("has-success").addClass("has-error");
                c++
            }else{
                $(".required").eq(i).parent().removeClass("has-error");
            }
        }
        if($("#register_mob").val().length != 10){
            $("#register_mob").parent().removeClass("has-success").addClass("has-error");
            c++;
        }else{
            $("#register_mob").parent().removeClass("has-error");
        }

        if(!checkEmail($("#register_email").val())){
            $("#register_email").parent().removeClass("has-success").addClass("has-error");
            c++;
        }else{
            $("#register_email").parent().removeClass("has-error");
        }

        if(c>0){
            $("#result").html("Please fill all the required fields").removeClass().addClass("alert alert-danger").show();
        }else{
            $("#result").hide();
            var email = $("#register_email").val();
            var password = $("#register_password").val();
            var name = $("#register_fname").val();
            var mobile = $("#register_mob").val();
            var gender = $("#register_gender").val();
            var country = $("#register_country").val();
            var qry={email:email,password:password,name:name,mobile:mobile,gender:gender,country:country};
            $("#btn_register").html("Please wait...");
            $("#result").html("Please wait...").removeClass().addClass("alert alert-info").show();
            $.ajax({
                type:'post',
                url:'http://192.168.0.200/plickr_api/User/Register',
                data:qry,
                dataType:'json',
                success: function (response) {
                    if(response.status=="ok"){
                        $("#register_email").val("");
                        $("#register_password").val("");
                        $("#register_fname").val("");
                        $("#register_mob").val("");
                        $("#result").html(response.result).removeClass().addClass("alert alert-success").show();
                        setTimeout(function(){
                            $("#result").slideUp();
                        },1000);
                        setTimeout(function(){
                            window.location.replace("dashboard.html");
                        },500);
                    }else if(response.status=="no"){
                        $("#result").html(response.result).removeClass().addClass("alert alert-danger").show();
                    }
                    setTimeout(function(){
                        $("#result").slideUp();
                    },2500);
                    $("#btn_register").text("Create Account. It's Free!")
                }

            });
        }

    });
});

function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function checkEmail(email)
{
    var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    if (reg.test(email)){
        return true;
    }else{
        return false;
    }
}