
<?php
header('Access-Control-Allow-Origin: *');
// Connect to the database
$mysql = mysqli_connect("localhost","root","","FairShare");
if(!$mysql){
    echo "Connection failed";
}

// Fetch entries from the table
$query = "SELECT * FROM Events";
$result=mysqli_query($mysql,$query);
$column=array();

while($entries = mysqli_fetch_assoc($result)){
    $column[]=$entries["eventName"];
}

// Send the entries as JSON response
echo json_encode($column);
?>