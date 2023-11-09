<?php

  include_once("../config/Database.php");
  include_once("../models/User.php");

  if($_SERVER['REQUEST_METHOD'] == 'GET') {
    $user_id = $_GET['id'];
    
    $database = new Database();
    $db = $database->connect();
    
    $user = new User($db);

    $deleted_user = $user->delete($user_id);

    echo json_encode(array('message' => 'Данные пользователя успешно удалены'));

  }
?>