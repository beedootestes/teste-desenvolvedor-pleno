DROP DATABASE IF EXISTS beedoo;
CREATE DATABASE IF NOT EXISTS beedoo;

CREATE TABLE beedoo.answers (
  answerId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  answerOptions VARCHAR(255) DEFAULT 'option 1, option 2, option 3'
);

INSERT INTO beedoo.answers (answerOptions) VALUES ('option 1, option 2, option 3');

CREATE TABLE beedoo.questions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question VARCHAR(255) DEFAULT 'new question',
    answerId INT NOT NULL,
    FOREIGN KEY(answerId)
    REFERENCES beedoo.answers(answerId)
);

INSERT INTO beedoo.questions (question, answerId) VALUES ('question 1', 1);
