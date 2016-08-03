$(document).ready(function(){
     $.ajax({
        url: "../api/search/",
        type:"get",
         //contentType: "application/json; charset=utf-8",
         // data:  JSON.stringify({ "action": 'email', "value": "a@a.com" }),
        success: function(msg){  
           $("#content").html(msg);
          }
       });
    
    
});