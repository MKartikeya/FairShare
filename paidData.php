<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}
$paidData = json_decode($_POST['paidData']);
if($paidData===null)echo "error";
$query1 = "DROP TABLE PaidData";
mysqli_query($mysql, $query1);
$query2 = "CREATE TABLE PaidData (P0 int)";
mysqli_query($mysql, $query2);

$numberOfEvents  = count($paidData);
error_log($numberOfEvents);
for( $i = 1; $i < count($paidData[0]); $i++){
  $query = "ALTER TABLE PaidData ADD P$i INT";
  mysqli_query($mysql, $query);
}
for( $i = 0; $i < $numberOfEvents; $i++){
  $query = "INSERT INTO PaidData VALUES (". intval($paidData[$i][0]);
  for( $j = 1; $j < count($paidData[$i]); $j++){
    $query .= " ,". intval($paidData[$i][$j]);
  }
  $query .= ")";
  mysqli_query($mysql, $query);
}
// Close the database connection
mysqli_close($mysql);
?>