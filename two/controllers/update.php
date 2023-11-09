<?php

   include_once("../config/Database.php");
   include_once("../models/User.php");
 
   if($_SERVER['REQUEST_METHOD'] == 'PUT') {
 
   $body = json_decode(file_get_contents('php://input'), true);
 
   $user_id = $body["userId"];
   $last_name = $body["lastName"];
   $first_name = $body["firstName"];
   $middle_name = $body["middleName"];
 
   $database = new Database();
   $db = $database->connect();
   
   $user = new User($db);
      
   $updated_user = $user->update($user_id, $last_name, $first_name, $middle_name);
 
   if ($updated_user) {
       echo json_encode(array('message' => 'Данные пользователя успешно обновлены'));
   }

  }
?>