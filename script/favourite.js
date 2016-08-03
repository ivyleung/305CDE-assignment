$(document).ready(function(){
    
    $.getJSON("api/favourite/", function(data){
        if(data!=""){
            $("#content").html("<h2>Favourite List</h2><table width='100%'>");
            $.each(data, function(i, row){
                $("#content").append("<tr><td width='70%'>Drug Name: </td><td><a href='drug/" + row.dname + "'>" + row.dname + "</a></td></tr>"
                + "<tr><td></td><td><a href='javascript:void(0)' onclick='favourite.delete(\""+row.dname+"\") '>delete</a></td></tr>"
                ); 
            $("#content").append("</table>"); 
            }) ;
            
        }else{
         $("#content").html("You have no item in favourite list!");
       }
    });
    
    favourite = {
        delete: function(dname){
            var myData = {"dname": dname};
            $.ajax({
            url: "api/favourite/",
            type:"DELETE",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                if(msg=='true'){
                    alert("Removed for Favourite list!");
                    location.reload();
                }else{
                    alert(msg);
                }
            }
        });
         }
    }
    
    
    
});