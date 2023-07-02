<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}

$values = json_decode($_POST['delete']);
if($values!='delete')return;

$query = "TRUNCATE TABLE Participants";
mysqli_query($mysql, $query);

$query = "TRUNCATE TABLE Events";
mysqli_query($mysql, $query);

$query = "TRUNCATE TABLE EventData";
mysqli_query($mysql, $query);

$query = "TRUNCATE TABLE PaidData";
mysqli_query($mysql, $query);

$query = "TRUNCATE TABLE ToPayData";
mysqli_query($mysql, $query);

mysqli_close($mysql);
?>