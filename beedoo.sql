DROP DATABASE IF EXISTS beedoo;
CREATE DATABASE IF NOT EXISTS beedoo;

CREATE TABLE beedoo.questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) DEFAULT 'new question',
    answerOptions VARCHAR(255) DEFAULT 'option 1, option 2, option 3, option 4'
);

INSERT INTO beedoo.questions (question) VALUES 
('question 1'),
('question 2'),
('question 3');