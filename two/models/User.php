<?php
class User
{
    private $connection;

    public $user_id;
    public $last_name;
    public $first_name;
    public $middle_name;

    public function __construct($db)
    {
        $this->connection = $db;
    }

    public function get_all()
    {
        $sql = "SELECT * FROM users";
   
        $result = mysqli_query($this->connection, $sql); 

        return $result;
    }

    public function check_existing($last_name, $first_name, $middle_name)
    {
        $sql = "SELECT * FROM users WHERE last_name = '$last_name' AND first_name = '$first_name' AND middle_name = '$middle_name'";
        
        $result = mysqli_query($this->connection, $sql);

        if(mysqli_num_rows($result) == 0){
          return false;
        } else {
          return true;
        }
    }

    public function create($last_name, $first_name, $middle_name)
    {
        $sql = "INSERT INTO users (last_name, first_name, middle_name) VALUES ('$last_name', '$first_name', '$middle_name')";
    
        $result = mysqli_query($this->connection, $sql);
        
        if(!$result){
            die("Failed to create user data !" . mysqli_error($this->connection));
        } 

        return $result;
    }

    public function update($user_id, $last_name, $first_name, $middle_name)
    {
        
        $sql = "UPDATE users SET last_name = '$last_name', first_name = '$first_name', middle_name = '$middle_name' WHERE user_id = '$user_id'";

        $result = mysqli_query($this->connection, $sql);

        if(!$result){
            die("Failed to update user data !" . mysqli_error($this->connection));
        } 

        return $result;
    }

    public function delete($user_id)
    {
        $sql = "DELETE FROM users WHERE user_id = '$user_id'";

        $result = mysqli_query($this->connection, $sql);

        if(!$result){
            die("Failed to delete user data !" . mysqli_error($this->connection));
        } 

        return $result;
    }
}

?>