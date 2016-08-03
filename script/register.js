 $(document).ready(function() {            

            var nameflag; var pwflag; var mailflag;
            nameflag = false; 
            pwflag = false;
            mailflag = false;          
  
            //Using Ajax to check if the username taken
            $("#name").blur(function() {                
            var myData = $("#name").val();            
            var URLs="api/register/" + myData;
            if(myData!=''){
                $.ajax({
                    url: URLs,
                    type:"GET",
                    dataType:'text',
                    success: function(msg){
                        if(msg=="false"){
                             $("#result").html("This user name has been taken!");
                             $('#result').css('color', 'red');
                             nameflag=false;
                        }else{
                            $("#result").html("This user name can be used!");      
                            $('#result').css('color', 'blue'); 
                            nameflag = true;                     
                        }                       
                    }               
                });
            }else{
                    $("#result").html("Please input the desired user name!");
                    $('#result').css('color', 'red');   
                    nameflag=false;
            }
            });
            
            //Check if the password is correct input two time
            $("#repw").blur(function(){
                var password = $("#pw").val();
                var repassword = $("#repw").val();
                if(password=="" || repassword ==""){
                    $("#chkpw").html("Please input the password!");
                    $('#chkpw').css('color', 'red');  
                    pwflag=false; 
                }else if(password!=repassword){
                    $("#chkpw").html("Please input the password correctly!");
                    $("#chkpw").css("color", "red");    
                    pwflag=false;               
                }else if(password.length < 6){
                    $("#chkpw").html("The length of password should be at least 6 !");
                    $("#chkpw").css("color", "red");  
                    pwflag=false;
                }else{
                    $("#chkpw").html("");
                    pwflag = true;
                }
            });
            
            //Check if the mail address vaild. 
            $("#mail").blur(function(){
                var mail = $("#mail").val();
                var testval = /(\w|\d)+@(\w|\d)+\.\w+/g
                //new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/g');
                if(testval.test(mail)){
                    $("#chkmail").html("");
                    mailflag=true;
                }else{
                    $("#chkmail").html("Please input the mail address correctly!");
                    $("#chkmail").css("color", "red");       
                    mailflag=false;            
                }                
            });
            
            //Enable the sumbit button when all columns have been filled
          $("#submit").click(function(){
             if(nameflag == true && pwflag == true && mailflag == true){
                var name = $("#name").val();
                var pw = $("#pw").val();
                var mail = $("#mail").val();
                var type = $("#type").val()
                var myData = {"uname": name,"pw": pw, "mail": mail, "type": type};
                var URLs = "api/register/";
                $.ajax({
                    url: URLs,
                    type:"POST",
                    //dataType:'json',
                    contentType: "application/json; charset=utf-8",
                    data:  JSON.stringify(myData),
                    success: function(msg){
                      var data = jQuery.parseJSON(msg);
                      if(data.success){                        
                          $("#content").html(" You have created the account! <br> "
                          + "The browser will redirect you to previous page. <br>"                          
                          + "<a href='javascript:history.back();'>You can return to the previous page manually if the browser no reaction</a>");
                          setTimeout(function(){history.back();}, 5000);
                      }else{
                          alert("Duplicate User name!\nPlease check your username!");
                      }
                     }                   
                });
            }else{
                 alert("Check your input!");
            }
          });
          
          $("#reset").click(function(){
              $("#name").val("");
              $("#pw").val("");
              $("#repw").val("");
              $("#mail").val("");       
              $("#result").html("");
              $("#chkpw").html("");
              $("#chkmail").html("");       
              nameflag = false; 
              pwflag = false;
              mailflag = false;   
          });
          

        });
    