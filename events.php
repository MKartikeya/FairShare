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
// Close the database connection
mysqli_close($mysql);
?>