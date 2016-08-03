<?php
    require_once("../util/session.php");
    include "menu.php";
    redirect();
?>


<html>
    <head>
        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src="script/register.js"></script>
        <link rel=stylesheet type="text/css" href="css/style.css">
        <script src="https://www.google.com/recaptcha/api.js"></script>
   
   <title>Register</title>
    </head>
    <body>
        
        <div id="outbox">
            <div id="content">
                <h1>Register</h1>
                <table>
                    <tr><td>User name: </td><td><input type="text" id="name"/></td><td><span id="result"></span></td></tr>
                    <tr><td>Password: </td><td><input type="password" id="pw"/></td></tr>
                    <tr><td>Re-input Password: </td><td><input type="password" id="repw"/></td><td><span id="chkpw"></span></td></tr>
                    <tr><td>E-mail address: </td><td><input type="text" id="mail"/></td><td><span id="chkmail"></span></td></tr>
                    <?php
                    if(isset($_SESSION['usertype'])){
                    echo "<tr><td>Member Type: </td><td>"
                    ."<select id='type'><option value='member'>Member</option>".
                    "<option value='admin'>Administrator</option>"."</td></tr>";
                    }
                    ?>
                    <tr><td colspan="2"><div style="margin: 0px auto; display: table" class="g-recaptcha" data-sitekey="6Le_8hoTAAAAAN6L5vk3u9BSDjWhHZuUiLTory4Y"></div></td></tr>
                    <tr><td><button id="submit" >Register</button></td><td><button id="reset" >Reset</button></td></tr>
                </table>
                <br>Already have a account? <a href="login.html">Please Login</a>
            </div>
        </div>

    </body>
    
</html>