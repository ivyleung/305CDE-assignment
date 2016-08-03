<?php

//header('Content-type: application/xml');
header('Access-Control-Allow-Origin', '*');
//header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
//header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept');
$data = file_get_contents("http://aidsinfo.nih.gov/api/drugs/");
print_r($data);
echo $data->id;

?>