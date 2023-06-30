<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}
$toPayData = json_decode($_POST['toPayData']);
if($toPayData===null)echo "error";
$q = "DROP TABLE ToPayData";
mysqli_query($mysql, $q);
$q1 = "CREATE TABLE ToPayData (P0 int)";
mysqli_query($mysql, $q1);

$numberOfEvents  = count($toPayData);
error_log($numberOfEvents);
for( $i = 1; $i < count($toPayData[0]); $i++){
  $query = "ALTER TABLE ToPayData ADD P$i INT";
  mysqli_query($mysql, $query);
}
for( $i = 0; $i < $numberOfEvents; $i++){
  $query = "INSERT INTO ToPayData VALUES (". intval($toPayData[$i][0]);
  for( $j = 1; $j < count($toPayData[$i]); $j++){
    $query .= " ,". intval($toPayData[$i][$j]);
  }
  $query .= ")";
  mysqli_query($mysql, $query);
}
// Close the database connection
mysqli_close($mysql);
?>