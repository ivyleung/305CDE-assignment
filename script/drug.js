$(document).ready(function(){
    var url = $(location).attr('pathname'); 
    var request = url.split('/');

     $.getJSON("../api/drug/"+request[3], function(data){
         $.each(data, function(i, row){
          $("#content").html("<table><tr><td>Drug Name: </td><td>" + row.name + "</td></tr>"
          + "<tr><td>Drug Type: </td><td>" + row.type + "</td></tr>"
          + "<tr><td>Desciption: </td><td width='70%'>" + row.desc + "</td></tr></table>" 
          + "<a href='javascript:void(0)' onclick='fav.add(\""+row.name+"\")'>Add to my favourite</a>"
          );          
     });
    });
    
    $.getJSON("../api/comment/"+request[3], function(data){
       $("#comment").html("<table width='100%'>");
         $.each(data, function(i, row){
            $("#comment").append("<tr><td colspan='2'>" + row.comment + "</td></tr>"
            + "<tr><td>Posted by: </td><td>" + row.uname 
            + " in : " + row.time + "</td></tr>"
            );
            if(row.owner){
                $("#comment").append("<tr>"
                +"<td><a href='javascript:void(0)' onclick='comment.pop(\""+row.comment+"\", \""+row.id+"\")'>Edit</a></td>" 
                +"<td><a href='javascript:void(0)' onclick='comment.delete(\""+row.id+"\")'>Delete</a></td>"
                +"</tr>");
            }
         }); 
     $("#comment").append("</table>" );
    });
    
    $("#submit").click(function(){
        var cm = $("#cm").val();
        if(cm!=""){
            var drugname = request[3];
            var myData = {"comment": cm, "dname": drugname};
            $.ajax({
            url: "../api/comment/",
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert("Comment Success!");
                location.reload();
            }
        });
        }
    });
    
    fav = {
        add: function(did){
        var myData = {"dname": did};
        $.ajax({
            url: "../api/favourite/",
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                if(msg=="true"){
                alert("Added to Favourite List!");
                location.reload();
                }else{
                    alert("Cannot add to favourite list. Maybe you have added?");
                }
            }
         });
        }
    }
    
  
   
    comment = {
        pop: function(cm, id){
            $("#dialog").html("<textarea id='cmedit'' cols='40' row='5'></textarea>");
            $("#cmedit").html(cm);
            $("#dialog").append("<br><button id='editcm'>Submit</button>");
            $( "#dialog").dialog({
                width: 500
            });
            
            $("#editcm").click(function(){
                var newcm = $("#cmedit").val();
                comment.edit(id, newcm);
            });
            
        },
        
        edit: function(id, cm){
            var myData = {"id": id, "cm": cm};
            $.ajax({
            url: "../api/comment/",
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert("Comment Edited!");
                location.reload();
            }
        });
        },
        
        delete:  function(id){
            var myData = {"id": id};
            $.ajax({
            url: "../api/comment/",
            type:"DELETE",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert("Comment Deleted");
                location.reload();
            }
        });
       }
    }
    
});

