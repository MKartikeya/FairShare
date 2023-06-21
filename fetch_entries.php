
<?php
header('Access-Control-Allow-Origin: *');
// Connect to the database
$dbHost = 'localhost';
$dbName = 'FairShare';

// $conn = new PDO("mysql:host=$dbHost;dbname=$dbName");
$conn=mysqli_connect("localhost","root","","FairShare");

// Fetch entries from the table
$query = "SELECT * FROM Participants";
$result=mysqli_query($conn,$query);
$column=array();

while($entries = mysqli_fetch_assoc($result)){
    $column[]=$entries["Name"];
}

// Send the entries as JSON response
echo json_encode($column);
?>
