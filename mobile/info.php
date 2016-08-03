<html>
<head>
<script src="http://code.jquery.com/jquery-1.11.3.min.js"></script>
<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>

<script>
$(document).ready(function(){
	  $( "#userpanel" ).on( "panelbeforeopen", function( event, ui ) {  
	var htmlStr = '<a href="../index.html" rel="external" class="ui-btn  .ui-button,  .ui-button-text .ui-button{ '
						+'font-size: 20px !important;}">Index</a>'
	$( "#userdetail" ).html(htmlStr);
	  });
});
</script>
<script src="../script/info.js" type="text/javascript"></script>
<style>
tr.border_bottom td {
  border-bottom:1pt solid black;
}
</style>
</head>

<body>
<div data-role="page" id="page">
	<div data-role="panel" id="userpanel" data-display="push">        
       <div id="userdetail"></div>
    </div>
	
	<div data-role="header" data-position="fixed">
	<a href="#userpanel" class="ui-btn ui-btn-inline ui-icon-user ui-btn-icon-left ui-corner-all ui-shadow ui-alt-icon .ui-button,  .ui-button-text .ui-button{  
font-size: 20px !important;}">User Info</a>
	
	<h1 id="title" ></h1>
	</div>
	
	<div data-role="content">
		<div id="content" style="margin: 0px auto; display: table"></div>
		<hr style="width:80%">
		<div id="comments" style="margin: 0px auto; display: table"></div>
		<div id = "addcm">
            <textarea id="cm" cols="40" rows="5" placeholder="Add comment.."></textarea>
            <button id="submit">Submit</button>
        </div>
	</div>
</div>

<!-- The dialog for edit comment -->
    <div data-role="dialog" id="dialog" title="Edit Comment" data-close-btn="right"  data-rel="dialog">
        <div data-role="content">
        Edit Comment
        <div id="dialogContent"> 
            <textarea id='cmedit' cols='40' row='5'></textarea>   
            <button id='editcm'>Submit</button>      
        </div>
        <button onClick="closeDialog()">Close</button>
        </div>
    </div>
</body>

</html>