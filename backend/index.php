<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
 header("Access-Control-Allow-Headers: Content-Type, Authorization");
 header("Content-Type: application/json"); 
include("database.php");
include("getTasks.php");
include("addTask.php");
include("deleteTask.php");
if($_SERVER["REQUEST_METHOD"]=="GET"){
    getTask($connect);
    
}
elseif($_SERVER["REQUEST_METHOD"]=="POST"){
    $data = json_decode(file_get_contents("php://input"));
    if($data->type == "delete")
     deleteTask($connect,$data);
    else{
        addTask($connect,$data);
    }
}
?>  