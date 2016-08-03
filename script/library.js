$(document).ready(function(){
    
    getAllData();

    
    
});


function getAllData(){
        var url = $(location).attr('pathname'); 
        var request = url.split('/');        
        $.getJSON("/"+request[1]+"/api/search/", function(data){
        descArray = [];
        var htmlStr = '<table width="80%"><tr><th>Drug Name</th><th>Type</th><th>Edit</th><th>Delete</th></tr>';
        $.each(data, function(k, v){
         descArray.push(v.desc);
         htmlStr +=  '<tr><td><a href="drug/' + v.name + '"> ' + v.name + "</a>" 
         + '</td><td> ' + v.type + '</td>'
         + '<td><a href="javascript:void(0)" onclick="editDialog(\''+ v.name +'\', \''+ v.type +'\', \''+k+'\' )">Edit</a></td>'
         + '<td><a href="javascript:void(0)" onclick="submit(\'' + v.name + '\')">Delete</a></td>'
         + '</tr>';
         });
         htmlStr += '</table>';
        $("#drugdata").html(htmlStr);
        });
}

function addDialog(){
     $("#dialog").attr("title", "Add drug");
     $("#dialog").html("");
     $("#dialog").append("Drug name: <input type='text' id='name' /><br>");
     $("#dialog").append("Drug type: <input type='text' id='type' /><br>");   
     $("#dialog").append("Drug Description: <textarea id='desc' cols='40' row='5'></textarea>");
     $("#dialog").append("<br><button onclick='submit(\"add\")'>Submit</button>");
     $( "#dialog").dialog({
                width: 500
     });
}

function editDialog(dname, type, desc){
     $("#dialog").attr("title", "Edit Drug");
     $("#dialog").html("");
     $("#dialog").append("Drug name: <input type='text' id='name' /><br>");
     $("#dialog").append("Drug type: <input type='text' id='type' /><br>");   
     $("#dialog").append("Drug Description: <textarea id='desc' cols='40' row='10'></textarea>");
     $("#dialog").append("<br><button onclick='submit(\"edit\")'>Submit</button>");
     $("#name").attr("value", dname);
     $("#name").prop("disabled", true);
     $("#type").attr("value", type);
     $("#desc").html(descArray[desc]);
     $( "#dialog").dialog({
                width: 500
     });
}



function submit(method){
    var desc = $("#desc").val();
    var name = $("#name").val();
    var type = $("#type").val();
    var action;
    if(method=="add"){
        action = "POST";
    }else if(method=="edit"){
        action = "PUT";
    }else{
        action = "DELETE";
        name = method;
    }
    
    var data = {"name": name, "type": type, "desc": desc};
    
     $.ajax({
                        url: "api/drug/",
                        type: action,
                        contentType: "application/json; charset=utf-8",
                        data:  JSON.stringify(data),
                        success: function(msg){ 
                        var data = jQuery.parseJSON(msg);
                        if(data.success){ 
                               alert("Action done!");
                               location.reload();
                            }else{
                               alert("Fail");
                            } 
                        },
                        error:function(xhr, ajaxOptions, thrownError){
                    alert(xhr.status);
                    alert(thrownError);
                 }               
             });
}