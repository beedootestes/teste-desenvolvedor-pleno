# Questions 

This document describes the API of questions and responses, that was created based at file "./test.md".

---

## INSTALLATION

After importing the repository from github open the terminal at the root of the project and type:

    npm run up

to install and orchestrate the containers of MongoDB and of the Question Application.

The application is going to run at port 5050. The API's urls are described below.

---
## API

The API was created using TDD (Test Driven Development), Clean Architecture to distribute responsabilities in layers, using SOLID fundamentals and Design Pattern whenever possible.

It was based on the course: https://www.udemy.com/course/tdd-com-mango

---

### Questions:
List of API's related with questions:

---
#### 1. ADD-QUESTION

Create a new Question.

URL: 
    
    http://localhost:5050/api/add-question

METHOD: POST

BODY: 

    {
        "question": "Minha primeira pergunta"
    }

---
#### 2. UPDATE-QUESTION

Update a question by id.

URL:

    http://localhost:5050/api/update-question/:question_id

METHOD: POST

BODY: 
    
    {
        "question": "update question"
    }

PARAMS: 

    question_id = id of a valid question.

---
#### 3. DELETE-QUESTION

Delete a question by id.

URL: 

    http://localhost:5050/api/delete-question/:question_id

METHOD: DELETE

PARAMS: 

    question_id = id of a valid question.

---
#### 4. LIST-QUESTIONS

List all questions and their responses.

URL: 

    http://localhost:5050/api/list-questions

METHOD: GET

PARAMS: 

    question_id = id of a valid question.

---

#### 5. GET-QUESTIONS

List only questions, no responses.

URL: 

    http://localhost:5050/api/get-questions

METHOD: GET

PARAMS: 

    question_id = id of a valid question.

---
### RESPONSES:

List of API's related with responses:

---
#### 1. ADD-RESPONSE

Create a new response to a related valid question ID.

URL: 
    
    http://localhost:5050/api/add-response/:question_id

METHOD: POST

BODY: 

    {
        "response": "My first response"
    }

PARAMS: 

    question_id = id of a valid question.

---
#### 2. UPDATE-RESPONSE

Update a response by question_id and old response value.

URL:

    http://localhost:5050/api/update-response/:question_id

METHOD: POST

BODY: 
    
    {
      "old_response": "response to be updated",
      "new_response": "New value of response"
    }

PARAMS: 

    question_id = id of a valid question.

---

#### 3. DELETE-RESPONSE

Update a response by question_id and old response value.

URL: 

    http://localhost:5050/api/delete-question/:question_id

METHOD: DELETE

BODY: 

    {
      "response": "response value to be deleted"
    }

PARAMS: 

    response_id = id of a valid response.

---

#### 4. LIST-RESPONSES

List responses of a question.

URL: 

    http://localhost:5050/api/list-responses/:question_id

METHOD: GET

PARAMS: 

    question_id = id of a valid question.
