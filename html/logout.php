<?php
    session_start();
    session_unset();
    session_destroy();
    if(isset($_COOKIE["username"])){
      unset($_COOKIE["username"]);
      unset($_COOKIE['usertype']);
      setcookie('username', '', time() - 3600, '/');
      setcookie('usertype', '', time() - 3600, '/');
    }
?>

<html>
    <head>
        <title>Logout...</title>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <link rel=stylesheet type="text/css" href="css/style.css">
        <script>
            $(document).ready(function() {  
            setTimeout(function(){$(location).attr('href','index.html');}, 5000);
            });
        </script>    
    </head>
    <body>
        You have logged out. Now will rediect you to the front page.<br>
        <a href="index.html">Or you can go back by clicking here.</a>
    </body>
</html>