<?php


function getTask($connection){
    $sqlQuery = "SELECT * FROM  task";
    $result = mysqli_query($connection,$sqlQuery);
    $tasksArray = array();
    
    if(mysqli_num_rows($result)>0){
        while($row = mysqli_fetch_assoc($result))
        {
            array_push($tasksArray,$row);
        }
        echo json_encode($tasksArray);
    }
    else
    {
        $row = mysqli_fetch_assoc($result);
    
        echo json_encode($row);
        
    }
        
  //  $row = mysqli_fetch_assoc($result);

       

    //echo $row["id"] . "<br>";
    //echo $row["name"] . "<br>";
    //echo $row["description"] . "<br>";
}
?>