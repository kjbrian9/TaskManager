<?php

$hostname = "localhost";
$username = "root";
$password = "";
$databaseName = "tododatabase";

try{
$connect = mysqli_connect($hostname,$username,$password,$databaseName);

}
catch(mysqli_sql_exception){
  
}
?>