var express = require('express')
var router = express.Router()
var AnswerModel = require("../model/AnswerModel")
var ResponseClass = require("../model/ResponseClass")

router.get("/", function(req, res, next){
    AnswerModel.getAll(function(error, result){
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

router.get("/listByQuestion/:id?", function(req, res, next){
    AnswerModel.listByQuestion(req.params.id, function(error, result){
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

router.get("/:id?", function(req, res, next){

    AnswerModel.get(req.params.id, function(error, result){
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

router.post("/?", function(req, res, next){

    AnswerModel.insert(req.body, function(error, result){
        let response = new ResponseClass()

        if( error ){
            response.error = true
            response.msg = "Não foi possível realizar a operação"
            console.log("Error: " + result)
        } else {
            if( result.affectedRows > 0 ){
                response.msg = "Resposta cadastrada com sucesso"
            } else {
                response.error = true
                response.msg = "Não foi possível realizar a operação"
            }
            response.data = result
        }
        res.json(response)
    })
})

router.put("/", function(req, res, next){

    AnswerModel.edit(req.body, function(error, result){
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Não foi possível realizar a operação"
            console.log("Error: " + error)
        } else {
            if(result.affectedRows > 0){
                response.msg = "Resposta editada com sucesso"
            } else {
                response.error = true
                response.msg = "Não foi possível realizar a operação"
            }
            response.data = req.body
        }
        res.json(response)
    })
})

router.delete("/:id?", function(req, res, next){

    AnswerModel.delete(req.params.id, function(error, result){
        let response = new ResponseClass()

        if(error){
            response.error = true
            response.msg = "Não foi possível realizar a operação"
            console.log("Error: " + error)
        } else {
            if(result.affectedRows > 0){
                response.msg = "Resposta excluída com sucesso"
            } else {
                response.error = true
                response.msg = "Não foi possível realizar a operação"
            }
        }

        res.json(response)
    })
})

module.exports = router