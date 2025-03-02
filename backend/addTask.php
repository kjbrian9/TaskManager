<?php
include("database.php");
function addTask($connection,$data){

    echo json_encode($data);
    $sqlQuery = "INSERT INTO task (name,description,date,createdDate) VALUES ('$data->name','$data->description','$data->date','$data->createdDate')";
    if(isset($data->name)){ 
        try{
            $result  = mysqli_query($connection,$sqlQuery);
   
        }
        catch(mysqli_sql_exception){

        }
    }
  
    

}


?>