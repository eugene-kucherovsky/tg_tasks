CREATE DATABASE IF NOT EXISTS tg_task_db;

CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100) NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO users (
        last_name,
        first_name,
        middle_name
    ) VALUES ('test', 'test', 'test');