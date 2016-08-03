$(document).ready(function(){

    
});


function startpage(uname){
        $.getJSON("api/user/"+uname, function(data){
            if(data.favCount==null){
                var count = 0;
            }else{
                count = data.favCount;
            }
            $("#content").html("<table>"
            +"<tr><td>User Name: </td><td>"+uname+"</td></tr>"
            +"<tr><td>E-mail</td><td><a href='mailto:"+data.mail+"'>"+data.mail+"</a></td></tr>"
            +"<tr><td>Total Favourite: </td><td>"+count+"</td></tr>"
            +"<tr><td><a href='javascript:void(0)' onclick='changepw(\""+ uname +  "\")'> Change Password</a></td>"
            +"<td><a href='javascript:void(0)' onclick='changemail(\""+uname+ "\")'>Change E-Mail</a></td></tr>"
            +"</table>" 
            );                
        });
}

function changepw(uname){
    $("#dialog").html("New Password: <input type='password' id='password'><br>"
    + "Re-enter Password: <input type='password' id='repassword'>"
    + "<button id='confirm'>Submit</button> <button id='reset'>Reset</button>"
    );
    $("#dialog").dialog({
                width: 500
    });
    
    $("#reset").click(function(){
        $("#password").val("");
        $("#repassword").val("");
    });
    
    $("#confirm").click(function(){
        if(passwordChecking()){
            var data = $("#password").val();
            var myData = {"action": "password", "value": data};
            $.ajax({
            url: "api/user/",
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert(msg);
                location.reload();
            }
        });
        }else{
            alert("Check your input!");
        }
    });
}

function passwordChecking(){
    var pw = $("#password").val();
    var repw = $("#repassword").val();
    if( repw==pw ){
        return true;
    }else{
        return false;
    }
}

function changemail(uname){
     $("#dialog").html("New E-mail: <input type='email' id='mail'><br>"
    + "<button id='confirm'>Submit</button> <button id='reset'>Reset</button>"
    );
    $("#dialog").dialog({
                width: 500
    });
    
     $("#reset").click(function(){
        $("#mail").val("");        
    });
    
    $("#confirm").click(function(){
        if(mailChecking()){
            var data = $("#mail").val();
            var myData = {"action": "email", "value": data};
            $.ajax({
            url: "api/user/",
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert(msg);
                location.reload();
            }
        });
        }else{
            alert("Check your input!");
        }
    });
}


function mailChecking(){
    var mail = $("#mail").val();
    var testval = /(\w|\d)+@(\w|\d)+\.\w+/g
    //new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/g');
    if(testval.test(mail)){
       return true;
    }else{
     return false;            
     }                
}
 