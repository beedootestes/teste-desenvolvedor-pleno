var express = require('express')
var router = express.Router()
var QuestionModel = require("../model/QuestionModel")
var ResponseClass = require("../model/ResponseClass")

/**
 * Lista todas as PERGUNTAS com suas respectivas opcoes de RESPOSTA.
 */
router.get("/", (req, res, next) => {
    
    QuestionModel.listQuestionWithAnswers((error, result) => {
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Error"
            console.log("Error: " + error)
        } else {
            var questions = []
            var item_id = null

            /**
             * popula o obj com as parguntas
             */
             for( var index in result ){
                let item = result[index]
                
                if( item_id != item.question_id ){
                    var question = {
                        "id": item.question_id,
                        "question": item.question_desc,
                        "ansers": []
                    }
                    questions.push(question)
                    item_id = item.question_id
                }   
            }   
             
            /**
             * popula as respostas inserindo no obj de perguntas
             */
             for( var index in result ){
                let item = result[index]
                
                if( item.answer_id != null ){
                    var answer = {
                        "id": item.answer_id,
                        "answer": item.answer_desc,
                        "question_id": item.question_id
                    }

                    for( var q in questions ){
                        let item_q = questions[q]
                        if( item.question_id == item_q.id ){
                            questions[q].ansers.push(answer)
                        }
                    }
                } 
            }
            response.data = questions
        }
        res.json(response)
    })
    
})

/**
 * Retorna uma PERGUNTA especifica
 */
router.get("/:id?", (req, res, next) => {

    QuestionModel.get(req.params.id, function(error, result){
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Error"
            console.log("Error: " + error)
        } else {
            response.data = result
        }

        res.json(response)
    })
})

/**
 * Adiciona uma nova PERGUNTA
 */
router.post("/?", (req, res, next) => {

    QuestionModel.insert(req.body, function(error, result){
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Error"
            console.log("Error: " + error)
        } else {
            if(result.affectedRows > 0){
                response.msg = "Pergunta inserida com sucesso"
            } else {
                response.error = true
                response.msg = "Não foi possível realizar a operação"
            }
            response.data = req.body
        }
        res.json(response)
    })
})

/**
 * Altera uma PERGUNTA
 */
router.put("/", function(req, res, next){

    QuestionModel.edit(req.body, function(error, result){
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Error"
            console.log("Error: " + error)
        } else {
            if(result.affectedRows > 0){
                response.msg = "Pergunta editada com sucesso"
            } else {
                response.error = true
                response.msg = "Não foi possível realizar a operação"
            }
            response.data = req.body
        }
        res.json(response)
    })
})

/**
 * Deleta uma PERGUNTA
 */
router.delete("/:id?", function(req, res, next){

    QuestionModel.delete(req.params.id, function(error, result){
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Error"
            console.log("Error: " + error)
        } else {
            if(result.affectedRows > 0){
                response.msg = "Pergunta excluída com sucesso"
            } else {
                response.error = true
                response.msg = "Não foi possível realizar a operação"
            }
        }

        res.json(response)
    })
})

module.exports = router