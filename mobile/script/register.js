$(document).ready(function(){
	 ///////////////////////////////////////////////////////////////////////////////////////////////////////
   //   Following is for sign up 

    
     //Check whether the name is used
     $("#nameRes").blur(function(){
          var myData = $("#nameRes").val();            
            var URLs="../api/register/" + myData;
            if(myData!=''){
                $.ajax({
                    url: URLs,
                    type:"GET",
                    dataType:'text',
                    success: function(msg){
                        if(msg=="false"){
                             $("#nameCheck").html("This user name has been taken!");
                             $('#nameCheck').css('color', 'red');
                        }else{
                            $("#nameCheck").html("This user name can be used!");      
                            $('#nameCheck').css('color', 'blue'); 
                        }                       
                    }               
                });
            }else{
                    $("#nameCheck").html("Please input the desired user name!");
                    $('#nameCheck').css('color', 'red');   
            }
      });   
      
       //Check if the password is correct input two time
            $("#repwRes").blur(function(){
                var password = $("#pwRes").val();
                var repassword = $("#repwRes").val();
                if(password=="" || repassword ==""){
                    $("#pwCheck").html("Please input the password!");
                    $('#pwCheck').css('color', 'red');  
                }else if(password!=repassword){
                    $("#pwCheck").html("Please input the password correctly!");
                    $("#pwCheck").css("color", "red");             
                }else if(password.length < 6){
                    $("#pwCheck").html("The length of password should be at least 6 !");
                    $("#pwCheck").css("color", "red");  
                }else{
                    $("#pwCheck").html("");
                }
            });    
            
             
            //Check if the mail address vaild. 
            $("#mailRes").blur(function(){
                var mail = $("#mailRes").val();
                var testval = /(\w|\d)+@(\w|\d)+\.\w+/g
                //new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/g');
                if(testval.test(mail)){
                    $("#mailCheck").html("");
                }else{
                    $("#mailCheck").html("Please input the mail address correctly!");
                    $("#mailCheck").css("color", "red");   
                }                
            });
            
       //Enable the sumbit button when all columns have been filled       
          $("#btnRes").click(function(){          
                var name = $("#nameRes").val();
                var pw = $("#pwRes").val();
                var pwre = $("#repwRes").val();
                var mail = $("#mailRes").val();                
                var type = "member"
                var myData = {"uname": name,"pw": pw, "mail": mail, "type": type};
                var URLs = "../api/register/";
                var testval = /(\w|\d)+@(\w|\d)+\.\w+/g;                   
                if(pw==pwre&&(testval.test(mail))){
                $.ajax({
                    url: URLs,
                    type:"POST",  
                    contentType: "application/json; charset=utf-8",
                    data:  JSON.stringify(myData),
                    success: function(msg){
                    var data = jQuery.parseJSON(msg);
                      if(data.success){                        
                          $("#registerContent").html(" You have created the account! <br> "
                          + "The browser will redirect you to previous page. <br>" );
                          //grecaptcha.reset(widgetId2);
                          setTimeout(function(){history.back();}, 3000);
                      }else if(msg=="false"){
                          alert("Duplicate User name!\nPlease check your username!");
                      }
                     }                   
                });
                }else{
                    alert("Somethings wrong! Check the input.");
                }            
          });
          
    
  //End of sign up process 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  

});