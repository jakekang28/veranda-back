-- Active: 1662208872303@@127.0.0.1@3306@032c

CREATE TABLE
    users (
        id VARCHAR(20) PRIMARY KEY,
        name VARCHAR(46) NOT NULL,
        psword VARCHAR(20) NOT NULL
    );

CREATE TABLE
    article(
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        title TEXT NOT NULL,
        article TEXT NOT NULL,
        path TEXT
    );

TRUNCATE users;

TRUNCATE article;