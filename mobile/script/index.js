$(document).ready(function(){

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
                htmlStr += '<a href="fav.html" class="ui-btn ui-corner-all ui-shadow ui-alt-icon" onclick="fav.html" rel="external">My Favourite List</button>';
                htmlStr += '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-alt-icon" onclick="logout()" >Logout</button>';
            }else{
                 htmlStr += "<h4>You have not logged in! Please log in or sign up to continue!</h4>"
                 + "<a class=\"ui-btn ui-corner-all ui-shadow ui-alt-icon\"  href='login.html' rel='external'>Login</a>"
                 + "<a class=\"ui-btn ui-corner-all ui-shadow ui-alt-icon\"  href='register.html' rel='external'>Register</a>";
            }
         $( "#userdetail" ).append( htmlStr );       
         /*
     }else{           
            $.getJSON("../util/session.php?function=getsession", function(data){
            var htmlStr = '<h3>My Info:<h3>';
            if(data!=""){
                htmlStr += '<h4>User Detail</h4>';
                htmlStr += '<table><tr><td>User Name: </td>';            
                htmlStr += "<td>"+data.name+"</td>";
                htmlStr += '</table>'; 
                htmlStr += '<a href="#fav" class="ui-btn" onclick="">My Favourite List</button>';
                htmlStr += '<a href="#" class="ui-btn" onclick="logout()" >Logout</button>';
            }else{
                htmlStr += "<h4>You have not logged in! Please log in or sign up to continue!</h4>"
                + "<a class=\"ui-btn\"  href='login.html' rel='external'>Login</a>"
                + "<a class=\"ui-btn\"  href='register.html' rel='external'>Register</a>";
            }
            $( "#userdetail" ).html( htmlStr );
        });
     }
    });
	 */
	
    };
    });

    $("#searchKey").click(function(){
        var keyword = $("#keyword").val();
          $.ajax({
            url: "../api/search/",
            type:"GET",
            data: {"keyword" : keyword},
            contentType: "application/json; charset=utf-8",
            success: function(msg){ 
                if(msg!=""){
                $("#searchResult").html("");
                $('<ul>').attr({'id':'test-listview', 'data-role': 'lisstview'}).appendTo("#searchResult");
                $.each(JSON.parse(msg), function(k, v){
                $('<li>').append('<a href="info/'+ v.id +' " rel="external">' + v.name + "</a>"
                + ' ( ' + v.type + ' ) ').appendTo('#test-listview');
                $("#test-listview").listview().listview('refresh');
                });
           //$("#searchResult").append('<ul data-role="listwiew">' + htmlStr + "</ul>");
                 
                }
            }
        });
    });


    });



 

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