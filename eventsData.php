<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}
$eventsData = json_decode($_POST['eventsData']);
if($eventsData===null)echo "error";
$q = "DROP TABLE EventData";
mysqli_query($mysql, $q);
$q1 = "CREATE TABLE EventData (P0 int)";
mysqli_query($mysql, $q1);

$numberOfEvents  = count($eventsData);
error_log($numberOfEvents);
for( $i = 1; $i < count($eventsData[0]); $i++){
  $query = "ALTER TABLE EventData ADD P$i INT";
  mysqli_query($mysql, $query);
}
for( $i = 0; $i < $numberOfEvents; $i++){
  $query = "INSERT INTO EventData VALUES (". intval($eventsData[$i][0]);
  for( $j = 1; $j < count($eventsData[$i]); $j++){
    $query .= " ,". intval($eventsData[$i][$j]);
  }
  $query .= ")";
  mysqli_query($mysql, $query);
}
// Close the database connection
mysqli_close($mysql);
?>