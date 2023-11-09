<?php

   include_once("../config/Database.php");
   include_once("../models/User.php");

   if($_SERVER['REQUEST_METHOD'] == 'GET') {
   
   $database = new Database();
   $db = $database->connect();

   $user = new User($db);
   
   $result = $user->get_all();
   
   if (mysqli_num_rows($result) > 0) {

    $usersArr = array();
    $usersArr['data'] = array();

    while ($row = mysqli_fetch_assoc($result)) {
        extract($row);
        $user_record = array(
            'userId' => $user_id,
            'lastName' => $last_name,
            'firstName' => $first_name,
            'middleName' => $middle_name
        );

        array_push($usersArr['data'], $user_record);
    }
   
      echo json_encode($usersArr);
   
   } else {

       echo json_encode(array('message' => 'no users found'));

   }

  }
?>