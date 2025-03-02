<?php
include("database.php");
function deleteTask($connection,$data){

    
  
    $sqlQuery = "DELETE FROM task WHERE name = '{$data->message}'";
    
    echo $sqlQuery;
    if(isset($data->message)){ 
        try{
            $result  = mysqli_query($connection,$sqlQuery);
            error_log($result);
        }
        catch(mysqli_sql_exception){

        }
    }
    

}
?>