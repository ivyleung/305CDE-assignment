<html>
    <head>
       <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
       <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
       <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
       <script src="../script/drug.js"></script>
       <link rel=stylesheet type="text/css" href="../css/style.css">
       <link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
       <script src="https://www.google.com/recaptcha/api.js" async defer></script>
       
<?php
    if(isset($_GET["drugname"])){
        echo '<title>'.$_GET["drugname"].'</title>';      
    }
    include "menu.php";
    isLoggedIn();
?>

</head>
<body>
    <div id = "outerbox">
        <div id = "content"></div>
        <hr width="70%">
        <div id = "comment"></div>
        <hr>
        <div id = "cmcontainner">
            <textarea id="cm" cols="40" rows="5" placeholder="Add comment.."></textarea>
            <br>
            <div style="margin: 0px auto; display: table" class="g-recaptcha" data-sitekey="6Le_8hoTAAAAAN6L5vk3u9BSDjWhHZuUiLTory4Y"></div>
                <br>
            <button id="submit">Submit</button>
        </div>

            
   </div>
           
        <div id="dialog" title="Edit"><div>
 </body>
</html>