DROP DATABASE IF EXISTS todo_db;

CREATE DATABASE todo_db;

USE todo_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    PRIMARY KEY (id)
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    project_description VARCHAR(255),
    creator_id INT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    PRIMARY KEY (id)
);

CREATE TABLE users_projects (
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE todos (
    id INT AUTO_INCREMENT NOT NULL,
    task VARCHAR(500),
    project_id INT NOT NULL,
    belongs_to INT NULL,
    finished BOOLEAN,
    task_priority INT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (belongs_to) REFERENCES users(id),
    PRIMARY KEY (id)
);

