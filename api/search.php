<?php
    include "../util/sqlcon.php";
    $method = $_SERVER['REQUEST_METHOD'];

    switch($method){
        case "GET":  
        /*
        $uri = explode("/", substr(@$_SERVER["REQUEST_URI"], 1));
        if($uri[3]==null){  //If there is no specified, show all record
            $sql = "SELECT * FROM drug";
            $result = mysqli_query($conn, $sql);
            $druglist =  array();
            while($row = mysqli_fetch_array($result)){   
                $rows =  array("name" => $row[0],
                               "type" => $row[1],
                               "desc" => $row[2]); 
                array_push($druglist, $rows);
            }
         echo json_encode($druglist);         
        }else{*/
            $kw = $_GET["keyword"];
            $sql = "SELECT * FROM hiv WHERE description LIKE '%$kw%'";
            $result = mysqli_query($conn, $sql) or die ("die");
            $druglist =  array();
            while($row = mysqli_fetch_array($result)){   
                $rows =  array(
                                "id" => $row[0],
                               "name" => $row[1],
                               "type" => $row[2]);
                              // "desc" => $row[3]); 
                array_push($druglist, $rows);
            }
            echo json_encode($druglist);  
        }














?>