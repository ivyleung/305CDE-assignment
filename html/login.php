<?php
    include "../util/session.php";
    include "menu.php";
    redirect();
?>
 
 <html>
     <head>
         <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
         <script src="script/login.js"></script>
         <link rel=stylesheet type="text/css" href="css/style.css">
         <title>Login</title>
     </head>
     <body>

    
        <div id="content">
                <h1>Login</h1>
                <table>
                    <tr><td>User name: </td><td><input type="text" id="name"/></td></tr>
                    <tr><td>Password: </td><td><input type="password" id="pw"/></td></tr> 
                    <tr><td></td><td><input type="checkbox" value="unchecked" id="remember">Remember Me</td></tr>
                    <tr><td><button id="submit" >Login</button></td><td><button id="reset" >Reset</button></td></tr>
                </table>
                <br>
                Need a new account? <a href="register.html">Please Register!</a>
            </div>
     </body>
</html>
