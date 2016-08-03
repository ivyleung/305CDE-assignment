<?php
    include "../util/sqlcon.php";
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case 'GET': //If the request is specified a drug, return a drug fulfill the name.
            $uri = explode("/", substr(@$_SERVER["REQUEST_URI"], 1));
            $sql = "SELECT * FROM drug WHERE drugname = '$uri[3]'";
            $result = mysqli_query($conn, $sql);
            $druglist =  array();
            $row = mysqli_fetch_array($result);
            $rows =  array("name" => $row[0],
                               "type" => $row[1],
                               "desc" => $row[2]); 
            array_push($druglist, $rows);
            echo json_encode($druglist);  
            mysqli_close($conn);
            break;
        case 'POST': //If create a new record
            $obj = json_decode(file_get_contents('php://input'));    
            $name = $obj->name;
            $type = $obj->type;
            $desc = $obj->desc;
            
            $sql = "insert into drug values ('$name', '$type', '$desc')";
            if(mysqli_query($conn, $sql)){
             $return = array("success" => true,
                                         "drugname" => $name);
                echo json_encode($return);
            }else{
                $return = array("success" => false,
                                        "error" => mysql_error());
                echo json_encode($return);
            }
           mysqli_close($conn);
           break;
        case 'PUT': //If update a record, only the description=^=
            $obj = json_decode(file_get_contents('php://input'));    
            $name = $obj->name;            
            $desc = $obj->desc;
            $type = $obj->type;
            
            $sql = "UPDATE drug SET description = '$desc', type = '$type' WHERE drugname = '$name' ";
            if(mysqli_query($conn, $sql)){
                $return = array("success" => true,
                                         "drugname" => $name);
                echo json_encode($return);
            }else{
                $return = array("success" => false,
                                        "error" => mysql_error());
                echo json_encode($return);
            }
        
        
            break;
        case 'DELETE': //If delete a record
            $obj = json_decode(file_get_contents('php://input'));    
            $name = $obj->name;   
            
            $sql = "DELETE FROM drug WHERE drugname = '$name' ";
            if(mysqli_query($conn, $sql)){
                $return = array("success" => true,
                                         "drugname" => $name);
                echo json_encode($return);
            }else{
                $return = array("success" => false,
                                        "error" => mysql_error());
                echo json_encode($return);
            }
            
            break;
            
    }
?>