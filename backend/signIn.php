    <?php
    function signIn($connection,$data){
            $username = filter_var($data->username,FILTER_SANITIZE_SPECIAL_CHARS);
            $password = filter_var($data->password,FILTER_SANITIZE_SPECIAL_CHARS);
            error_log("username".$username ."kaka".$data->username);
            $sqlQuery = "SELECT * FROM  users WHERE username = '$username'";
            $usersArray = array();
            $result = mysqli_query($connection,$sqlQuery);
            
            if(mysqli_num_rows($result)>0){
               while($row = mysqli_fetch_assoc($result)){
                array_push($usersArray,$row);
                if($row['password'] == $password)
                {
                echo json_encode(["status" => "match", "UserId" => $row["UserId"]]);
                session_start();
                $_SESSION["userId"] = $row["UserId"];
                }
                else    
                echo json_encode("no match");
                
              } 
            }
            else
            {
                $noMatches = 'no matches';
                echo json_encode($noMatches);
            }
            

    }
    ?>