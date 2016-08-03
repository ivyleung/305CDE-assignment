$(document).ready(function() {  
      
    $("#submit").click(function(){
        
        var uname = $("#name").val();
        var password = $("#pw").val();
        var cookie = false ;
        if($("#remember").is(":checked")){
           cookie = true;
        }
       
        
        var data = {"uname": uname, "password": password, "remember": cookie};
        
        if(uname!=""&&password!=""){
            $.ajax({
                        url: "api/login/",
                        type:"POST",
                        contentType: "application/json; charset=utf-8",
                        data:  JSON.stringify(data),
                        success: function(msg){ 
                        var data = jQuery.parseJSON(msg);
                        if(data.success){ 
                                $("#content").html("Welcome back, " + uname 
                               + ". The browser will redirect you to previous page. <br>"                          
                               + "<a href='javascript:history.back();'>You can return to the previous page manually if the browser no reaction</a>");
                               setTimeout(function(){history.back();}, 5000);
                            }else{
                               alert("Please check your user name and password!");
                            } 
                        },
                        error:function(xhr, ajaxOptions, thrownError){
                    alert(xhr.status);
                    alert(thrownError);
                 }               
             });
        }else{
            alert("Please fill in all the column.");
        }
    });
    
     $("#reset").click(function(){
              $("#name").val("");
              $("#pw").val("");
          });
});