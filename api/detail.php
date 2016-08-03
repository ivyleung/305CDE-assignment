<?php
   include "../util/sqlcon.php";
   $method = $_SERVER['REQUEST_METHOD'];
   
    switch($method){
        case 'GET': 
		$uri = explode("/", substr(@$_SERVER["REQUEST_URI"], 1));
            $sql = "SELECT * FROM hiv WHERE data_id = '$uri[3]'";
            $result = mysqli_query($conn, $sql);
            $row = mysqli_fetch_array($result);
            $rows =  array("dataname" => $row[1],
                           "type" => $row[2],
						   "desc" => $row[3],
						   "id" => $row[0]); 
            echo json_encode($rows);  
            mysqli_close($conn);
            break;
	}

?>