<?php
  function createUser($connection,$data){
    echo json_encode($data);
    error_log("createUser() pre-if");
    if(isset($data->username)&&isset($data->password)){
        $username = filter_var($data->username,FILTER_SANITIZE_SPECIAL_CHARS);
        $password = filter_var($data->password,FILTER_SANITIZE_SPECIAL_CHARS);
        error_log("createUser() in if");
        $sqlQuery = "INSERT INTO users (username,password) VALUES ('$username','$password')";
    try{
        $result  = mysqli_query($connection,$sqlQuery);
        error_log("createUser() try");

    }
    catch(mysqli_sql_exception $e){
      error_log($e);
    }
  }
}
?>