<?php
include("database.php");
function addTask($connection,$data){
    $name = filter_var($data->name,FILTER_SANITIZE_SPECIAL_CHARS);
    $description = filter_var($data->description,FILTER_SANITIZE_SPECIAL_CHARS);
            
    echo json_encode($data);
        $sqlQuery = "INSERT INTO task (name,description,dueDate,createdDate,UserId) VALUES ('$name','$description','$data->date','$data->createdDate','$data->userId')";
        if(isset($data->name)){ 
        try{
            $result  = mysqli_query($connection,$sqlQuery);
   
        }
        catch(mysqli_sql_exception $e){
                error_log($e);
        }
    }
  
    

}


?>