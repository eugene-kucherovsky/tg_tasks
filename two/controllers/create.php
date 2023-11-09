<?php

  include_once("../config/Database.php");
  include_once("../models/User.php");

  if($_SERVER['REQUEST_METHOD'] == 'POST') {

     $body = json_decode(file_get_contents('php://input'), true);

     $last_name = $body["lastName"];
     $first_name = $body["firstName"];
     $middle_name = $body["middleName"];

     $database = new Database();
     $db = $database->connect();
     
     $user = new User($db);
        
     $existed_user = $user->check_existing($last_name, $first_name, $middle_name);

      if ($existed_user) {

        echo json_encode(array('message' => 'Пользователь с таким именем уже существует'));
    
       } else {
    
        $created_user = $user->create($last_name, $first_name, $middle_name);

        if ($created_user) {
            echo json_encode(array('message' => 'Новый пользователь успешно создан'));
        }
       
       }

  }
?>
