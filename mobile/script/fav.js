$(document).ready(function(){
            var htmlStr='';
             $.getJSON("../api/favourite/", function(data){
             if(data!=""){
                    htmlStr="<div style='margin: 0px auto; display: table; ' <h2>Favourite List</h2><ul>";
                    $.each(data, function(i, row){
                        htmlStr+= "<li>Item Name: "
                        + "<a href='info/"+  row.dataid +" ' rel='external'>" + row.dname + "</a></li>"
                        + "<a class='ui-btn ui-btn-inline ui-shadow ui-corner-all' href='javascript:void(0)' onclick='deleteItem(\""+row.dataid+"\") '>delete</a></td></tr>"
                    });
                    htmlStr+="</ul></div>";   
                    $("#favContent").html(htmlStr);            
            }else{
                htmlStr = "You have no item in favourite list!";
                $("#favContent").html(htmlStr);   
            }
          });   

});

function deleteItem(id){
             var myData = {"dname": id};
            $.ajax({
            url: "../api/favourite/",
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