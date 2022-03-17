const express = require('express');
const router = express.Router();
const { resolve } = require('path');
const { Question, Answer } = require(resolve('src', 'app', 'models'));

//CRUD das questões - Início

router.post('/', async (req, res)=>{
    try {
        const { description } = req.body;

        if(!description) return res.status(400).json('Descrição não informada!');

        const question = await Question.create({
            description
        });

        return res.status(201).json(question);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.get('/', async (req, res)=>{
    try {

        const questions = await Question.findAll();
        return res.status(200).json(questions);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const { description } = req.body;
        const { id } = req.params;

        if(!description) return res.status(400).json('Descrição não informada!');

        const question = await Question.findByPk(Number(id));
        question.description = description;

        const result = await question.save();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.delete('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const question = await Question.findByPk(Number(id));

        await question.destroy();

        return res.status(200).json(`Pergunta ${id} deletada!`);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//CRUD das questões - Fim

//CRUD das respostas - Início

router.post('/:questionId/answer', async (req, res)=>{
    try {
        const { description } = req.body;
        const { questionId } = req.params;

        if(!description) return res.status(400).json('Descrição não informada!');

        const answer = await Answer.create({
            description,
            questionId
        });

        return res.status(201).json(answer);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.get('/:questionId/answer', async (req, res)=>{
    try {

        const { questionId } = req.params;

        const answers = await Answer.findAll({
            where: {
                questionId
            }
        });
        return res.status(200).json(answers);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.put('/:questionId/answer/:answerId', async (req, res)=>{
    try {
        const { description } = req.body;
        const { questionId, answerId } = req.params;

        if(!description) return res.status(400).json('Descrição não informada!');

        const answer = await Answer.findAll({
            where: {
                id: answerId,
                questionId
            }
        });

        answer[0].description = description;

        const result = await answer[0].save();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.delete('/:questionId/answer/:answerId', async (req, res)=>{
    try {
        const { questionId, answerId } = req.params;
        const answer = await Answer.findAll({
            where: {
                questionId,
                id: answerId
            }
        });

        await answer[0].destroy();

        return res.status(200).json(`Resposta ${answerId} deletada!`);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

//CRUD das respostas - Fim

//Todas as perguntas com suas opções de respostas
router.get('/answer', async (req, res)=>{
    try {

        const questions = await Question.findAll();
        const answers = await Answer.findAll();

        const result = questions.map((question)=>{
            let newObj = question;
            newObj.dataValues.answers = answers.filter(({questionId})=>questionId===question.id);
            return newObj;
        });

        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;