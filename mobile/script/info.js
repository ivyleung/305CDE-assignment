$(document).ready(function(){
    var url = $(location).attr('pathname'); 
    var request = url.split('/');

	checkLogInStatus();

	 //Left Panel handling
    $( "#userpanel" ).on( "panelbeforeopen", function( event, ui ) {          
        if(typeof(Storage) !== "undefined"){
            var session = sessionStorage.user;
            var htmlStr = '<h3>My Info:<h3>';
            if(session !== undefined){
                htmlStr += '<h4>User Detail</h4>';
                htmlStr += '<table><tr><td>User Name: </td>';            
                htmlStr += "<td>"+session+"</td>";
                htmlStr += '</table>'; 
                htmlStr += '<a href="../fav.html" class="ui-btn ui-corner-all ui-shadow ui-alt-icon" onclick="" rel="external">My Favourite List</button>';
                htmlStr += '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-alt-ico" onclick="logout()" >Logout</button>';
            }else{
                 htmlStr += "<h4>You have not logged in! Please log in or sign up to continue!</h4>"
                 + "<a class=\"ui-btn ui-corner-all ui-shadow ui-alt-icon\"  href='../login.html' rel='external'>Login</a>"
                 + "<a class=\"ui-btn ui-corner-all ui-shadow ui-alt-icon\"  href='../register.html' rel='external'>Register</a>";
            }
         $( "#userdetail" ).append( htmlStr );       
		}
	});
	
	
	$.getJSON("../../api/detail/"+request[4], function(data){
		$("#title").html(data.type).enhanceWithin();//Change the title
		//Show the content in the database
		$("#content").append("<h2><font color= #6A5ACD style='text-align:\"justify\"'>Item: " + data.dataname + "</h2>");
		$("#content").append("<h4 span style='text-align:\"justify\"'>" + data.desc + "</span>" + "</h4>" );	
		$("#content").append("<br><a href='javascript:void(0)' style='text-align:\"right\"' onclick='addFav(\""+data.id+"\")'>Add to my favourite</a>");	
	});
	
	$.getJSON("../../api/comment/"+request[4], function(data){
		if(data.length>0){
			$("comments").html("<table>");
			$.each(data, function(i, row){
				$("#comments").append("<tr ><td colspan='2'>" + row.comment + "</td></tr>"
				+ "<tr class='border_bottom'><td>Posted by: </td><td>" + row.uname 
				+ " in : " + row.time + "</td></tr>"
                );
				if(row.owner){
					$("#comments").append("<tr>"
					+"<td><a href='javascript:void(0)' onclick='pop(\""+row.comment+"\", \""+row.id+"\")'>Edit</a></td>" 
					+"<td><a href='javascript:void(0)' onclick='deleteComment(\""+row.id+"\")'>Delete</a></td>"
					+"</tr><tr></tr>");
				}
			});
			$("comments").append("</table>");
	}else{
		$("#comments").html("Currently no comment here, just add it!");
	}
	});
	
	//To add the comment
	 $("#submit").click(function(){
        var cm = $("#cm").val();
        if(cm!=""){
            var dataid = request[4];
			var uname = null;
			if(typeof(Storage)!=="undefined"){
				uname = sessionStorage.user;
			}
            var myData = {"comment": cm, "did": dataid, "uname": uname};
            $.ajax({
            url: "../../api/comment/",
            type:"POST",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
				if(msg=="true"){
					alert("Comment Success!");
					location.reload();
				}
            }
        });
        }
    });
	
	
	
});

function pop(cm, id){
            $("#cmedit").html(cm);            
            $.mobile.changePage('#dialog', 'pop', true, true);
            $("#editcm").click(function(){
                var newcm = $("#cmedit").val();
                editComment(id, newcm);
            });
}

function closeDialog(){
            $('.ui-dialog').dialog('close').enhanceWithin();
}

function editComment(id, cm){
	 var myData = {"id": id, "cm": cm};
            $.ajax({
            url: "../../api/comment/",
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert("Comment Edited!");               
                location.reload();
            }
	});
}

function deleteComment(id){
            var myData = {"id": id};
            $.ajax({
            url: "../../api/comment/",
            type:"DELETE",
            contentType: "application/json; charset=utf-8",
            data:  JSON.stringify(myData),
            success: function(msg){ 
                alert("Comment Deleted");
                location.reload();
            }
			});
}

function checkLogInStatus(){
	if(typeof(Storage)!==undefined){
		var loginStatus = sessionStorage.user;
		if(loginStatus==undefined){
			    $("#comments").prop('disabled', true);
                $("#comments").prop('placeholder', "Please Login to continue");
                $("#submit").prop('disabled', true);
            }else{
                 $("#comments").prop('disabled', false);
                 $("#comments").prop('placeholder', "Add comment..");
                 $("#submit").prop('disabled', false);				
		}
	}
}


function logout(){
    sessionStorage.clear();   
     $.ajax({
                        url: "../util/session.php?function=logout",
                        type:"GET",
                        success: function(msg){ 
                           alert(msg);
                           location.href="index.html";
                        },
                        error:function(xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                 }               
             });
}

function addFav(did){
	if(typeof(Storage)!==undefined){
		var loginStatus = sessionStorage.user;
		if(loginStatus!=undefined){
			 var myData = {"dname": did};
        $.ajax({
            url: "../../api/favourite/",
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
		}else{
			alert("You must login first!");
		}
	}
}

function logout(){
    sessionStorage.clear();   
   // alert("logout success!");
   // location.href="../index.html";
     $.ajax({
                        url: "../util/session.php?function=logout",
                        type:"GET",
                        success: function(msg){ 
                           alert(msg);
                           location.href="index.html";
                        },
                        error:function(xhr, ajaxOptions, thrownError){
                        alert(xhr.status);
                        alert(thrownError);
                 }               
             });
}      