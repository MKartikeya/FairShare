<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}

// Retrieve the values sent from JavaScript
$values = json_decode($_POST['eventsList']);

$query = "TRUNCATE TABLE Events";
mysqli_query($mysql, $query);

// Prepare and execute the INSERT statement for each value
foreach ($values as $value) {
  $value = mysqli_real_escape_string($mysql, $value); // Sanitize the value
  $query = "INSERT INTO Events (eventName) VALUES ('$value')";
  mysqli_query($mysql, $query);
}

// $eventsData = json_decode($_POST['eventsData']);
// if($eventsData===null)echo "error";
// $q = "DROP TABLE EventData";
// mysqli_query($mysql, $q);
// $q1 = "CREATE TABLE EventData (P0 int)";
// mysqli_query($mysql, $q1);

// $numberOfParticipants = sizeof($eventsData[0]);
// $numberOfEvents  = sizeof($eventsData);
// error_log($numberOfEvents);
// for( $i = 1; $i < $numberOfParticipants; $i++){
//   $query = "ALTER TABLE EventData ADD P'$i' int";
//   mysqli_query($mysql, $query);
// }
// for( $i = 0; $i < $numberOfParticipants; $i++){
//   for( $j = 0; $j < $numberOfEvents; $j++){
//     $query = "INSERT INTO EventData (P'$i') VALUES ('$eventsData[$j][$i]')";
//     mysqli_query($mysql, $query);
//   }
// }
// Close the database connection
mysqli_close($mysql);
?>