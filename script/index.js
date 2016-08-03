$(document).ready(function(){
    var url = $(location).attr('pathname'); 
    var request = url.split('/');

    $.getJSON("/"+request[1]+"/api/search/", function(data){
        
        var htmlStr = '<table width="80%"><tr><th>Drug Name</th><th>Type</th></tr>';
        $.each(data, function(k, v){
         htmlStr +=  '<tr><td><a href="drug/' + v.name + '"> ' + v.name + "</a>" 
         + '</td><td> ' + v.type + '</td></tr>';
         });
         htmlStr += '</table>';
        $("#drugdata").append(htmlStr);
        });
        
     $("#searching").click(function(){
        var keyword = $("#keyword").val();
        var htmlStr='';
        var flag = false;
        $.getJSON("api/search/"+keyword, function(data){
        if(data!=""){
            htmlStr = "<h2>The searching result of the keyword: " + keyword;
            htmlStr += '<table width="100%"><tr><th>Drug Name</th><th>Type</th></tr>';
            $.each(data, function(k, v){
             htmlStr +=  '<tr><td><a href="drug/' + v.name + '"> ' + v.name + "</a>" 
              + '</td><td> ' + v.type + '</td></tr>';
         });
         htmlStr += '</table>';
        }else{
            htmlStr = "<h2>No Record!</h2>" 
            + "<br>Please try other keyword!"
            + "<br>Please note that this function is only for search the name of drug(s)";
        }
        $("#outerbox").html(htmlStr);
        });
        
     });
    
});