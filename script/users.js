$(document).ready(function(){
    $.getJSON("api/user/", function(data){
            $("#content").html("<h2>User List</h2><table width='250px'>");
            $.each(data, function(i, row){
                $("#content").append("<tr>"
                +"<td width='50%'>User Name: </td><td><a href='javascript:void(0)' onclick='showDetail(\"" + row.username + "\")'>" + row.username + "</a></td>"
                +"<td><a href='javascript:void(0)' onclick='deleteUser(\"" + row.username + "\")'>Delete </a></td>"
                +"</tr>"
                ); 
            $("#content").append("</table>"); 
            }) ;
    });
    
    
});

function showDetail(uname){
     $.getJSON("api/user/"+uname, function(data){
         if(data.favCount==null){
             var count = 0;
         }else{
             count = data.favCount;
         }
         $("#dialog").attr("title", "User Detail: "+uname);
         $("#dialog").html("<table>"
         +"<tr><td>User Name: </td><td>"+uname+"</td></tr>"
         +"<tr><td>E-mail</td><td><a href='mailto:"+data.mail+"'>"+data.mail+"</a></td></tr>"
         +"<tr><td>Total Favourite: </td><td>"+count+"</td></tr>"
         +"</table>"
         );        
         $("#dialog").dialog({
                width: 500
          });
     });
}

function deleteUser(uname){
       $.ajax({
                url: "api/user/",
                type:"delete",
                contentType: "application/json; charset=utf-8",
                data:  JSON.stringify({"uname": uname }),
                success: function(msg){ 
                   alert(msg);
                   location.reload();
                }
        });
}


