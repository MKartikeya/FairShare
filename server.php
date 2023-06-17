<?php
$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}

// Retrieve the values sent from JavaScript
$values = json_decode($_POST['participantsList']);

// Prepare and execute the INSERT statement for each value
foreach ($values as $value) {
  $value = mysqli_real_escape_string($mysql, $value); // Sanitize the value
  $query = "INSERT INTO Participants (Name) VALUES ('$value')";
  mysqli_query($mysql, $query);
}

// Close the database connection
mysqli_close($mysql);
?>
