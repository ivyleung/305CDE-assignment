<?php
    include "../util/sqlcon.php";
    require("../util/session.php");
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method){
        case "GET":
         $request = explode("/", substr(@$_SERVER['REQUEST_URI'], 1));
         $username = $request[3];
         if($username==null&&isset($_SESSION['usertype'])){
            $userlist =  array();
            $sql = "SELECT * FROM member";
            $result = mysqli_query($conn, $sql);           
            while($row = mysqli_fetch_array($result)){
                $temp =  array("username" => $row[0],
                                         "mail" => $row[2],
                                         );
                array_push($userlist, $temp);
            }
            echo json_encode($userlist);       
         }else{
            $sql = "SELECT COUNT(*) FROM favourite WHERE username = '$username' GROUP BY username";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_array($result);   
            $count = $row[0];
            $sql = "SELECT * FROM member WHERE username = '$username'";
            $result = mysqli_query($conn, $sql);
            $userlist =  array();
            $row = mysqli_fetch_array($result);   
            $userlist =  array("username" => $row[0],
                                        "mail" => $row[2],
                                        "favCount" => $count);
            echo json_encode($userlist);       
         }
         break;
         
         case "PUT":
         $action = "";
         $username = $_SESSION["username"];
         $data = json_decode(file_get_contents("php://input"));
         if($data->action=="password"){
             $action = "password";
         }else if($data->action=="email"){
             $action = "email";
         }
         $sql = "UPDATE Member SET $action = '$data->value' WHERE username = '$username'";
         $result = mysqli_query($conn, $sql);
         if($result==true){
             echo $action." is changed!";
         }
         break;
         
         case 'DELETE': //If to delete a user.
         $data = json_decode(file_get_contents("php://input"));         
         $sql = "DELETE FROM member WHERE username = '$data->uname'";
         $result = mysqli_query($conn, $sql);
         if($result==true){
             echo $data->uname." is deleted!";
         }else{
             echo "Fail";
         }
         break;
        
    }
  
    
?>