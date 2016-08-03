<?php 
   include "../util/sqlcon.php";
   $method = $_SERVER['REQUEST_METHOD'];
   
    switch($method){
        case 'GET': 
		$sql = "Select * from hiv order by data_id";
		$result = mysqli_query($conn, $sql);
		$datalist =  array();
        while($row = mysqli_fetch_array($result)){ 
              $rows =  array("dataname" => $row[1],
							 "type" => $row[2],
							 "id" => $row[0]); 
            array_push($datalist, $rows);
            }
            echo json_encode($datalist);  
            mysqli_close($conn);
            break;
	}

?>