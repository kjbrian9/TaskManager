<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
 header("Access-Control-Allow-Headers: Content-Type, Authorization");
 header("Content-Type: application/json"); 
include("database.php");
include("getTasks.php");
include("addTask.php");
include("deleteTask.php");
include("createUser.php");
include("signIn.php");
include("signOut.php");
$user = null;
if($_SERVER["REQUEST_METHOD"]=="GET"){
    getTask($connect,$user);
    
}
elseif($_SERVER["REQUEST_METHOD"]=="POST"){
    $data = json_decode(file_get_contents("php://input"));
    if($data->type == "delete")
     deleteTask($connect,$data);
    elseif($data->type == "signUp"){
        createUser($connect,$data);
    }
    elseif($data->type == "create"){
        addTask($connect,$data);
    }
    elseif($data->type == "signIn"){
        signIn($connect,$data);
    }
    elseif($data->type == "signOut"){
        signOut();
    }
}
?>  