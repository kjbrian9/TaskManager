<?php
  function signOut(){
    session_start();
    $_SESSION= [];
    session_destroy();  
    echo json_encode("signed out");
  }

?>