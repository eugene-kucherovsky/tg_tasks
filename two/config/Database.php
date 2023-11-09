<?php

class Database
{
    private $hostname = "localhost";
    private $username = "root";
    private $password = "enter_your_password_here";
    private $database = "tg_task_db";
    private $connection;

    public function __construct()
    {
    }

    public function connect()
    {
        $this->connection = null;

        $this->connection = mysqli_connect($this->hostname, $this->username, $this->password, $this->database) or die("Database connection not established.");

        return $this->connection;
    }
}

?>