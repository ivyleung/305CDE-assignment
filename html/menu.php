
<html>
<head>
    <?php
    $uri = explode("/", substr(@$_SERVER["REQUEST_URI"], 1));
    $url = "/".$uri[0]."/";   
    echo '<link rel=stylesheet type="text/css" href="'.$url.'css/style.css">';
    ?>
</head>
<body>
    <div id="menu">
    <?php
        require_once("../util/session.php");
        $uri = explode("/", substr(@$_SERVER["REQUEST_URI"], 1));
        $url = "/".$uri[0]."/";   
        echo "<a href='".$url."index.html'>Top<a> | " ;
        if(isset($_SESSION["username"])){           
            echo "Welcome, ".$_SESSION["username"]."<br>";      
              if($_SESSION['usertype'] == "admin"){ //If the user is logged in as admin, provide admin function.
                 echo "<a href='".$url."register.html'>Register </a> | ";
                 echo "<a href='".$url."library.html'>Drug Control</a> | ";
                 echo "<a href='".$url."users.html'>User Control</a> | ";
            }   
            echo "<a href='".$url."user.html'>My detail</a> | ";  
            echo "<a href='".$url."favourite.html'>My favourite</a> | ";
            echo "<a href='".$url."logout.html'>Logout</a> ";
        }else{
            echo "Welcome, Guest <br>";
            echo "<a href='".$url."register.html'>Register</a> | <a href='".$url."login.html'>Login</a>";
        }
    ?>
    </div>
    <hr>
</body>
</html>


