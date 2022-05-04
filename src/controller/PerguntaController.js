const models = require('../models')

module.exports = {

    async store(req, res) {
        
        try {
            const pergunta = req.body

            const createdPergunta = await models.Perguntas.create(pergunta)

            return res.status(200).json({
                message: 'Pergunta cadastrada',
                createdPergunta
            })
        } catch (error) {
            console.log(`Aconteceu um erro no CREATE: ${error}`)
        }
    },

    async index(req, res) {
        try {
            const { count, rows } = await models.Perguntas.findAndCountAll()

            if (count === 0) {
                return res.status(404).json({
                    message: 'Perguntas não encontradas'
                })
            }

            return res.status(200).json({
                message: 'Perguntas Localizadas',
                count,
                rows
            })
        } catch (error) {
            console.log(`Aconteceu um erro no INDEX: ${error}`)
        }
    },

    async update(req, res) {
        try {
            const perguntaId = req.params.id
            const perguntaCampo = req.body

            const pergunta = await models.Perguntas.findByPk(perguntaId)

            if (!pergunta) {
                return res.status(404).json({
                    message: "Pergunta não encontrada"
                })
            }

            const perguntaUpdate = await pergunta.update(perguntaCampo)

            return res.status(200).json({
                message: "Pergunta atualizada com sucesso",
                perguntaUpdate
            })
        } catch (error) {
            console.log(`Aconteceu um erro no UPDATE: ${error}`)
        }
    },

    async delete(req, res) {
        try {
            const perguntaId = req.params.id

            if (!req.params.id) {
                return res.status(400).json({
                    message: "ID da pergunta não enviado"
                })
            }

            const pergunta = await models.Perguntas.findByPk(perguntaId)

            if (!pergunta) {
                return res.status(404).json({
                    message: "Pergunta não encontrada"
                })
            }

            //NÃO É POSSIVEL DELETAR UMA PERGUNTA QUE TEM "RESPOSTAS ASSOCIADAS - USAR O CASCADE"
            await pergunta.destroy()

            return res.status(200).json({
                message: "Pergunta deletada"
            })
        } catch (error) {
            console.log(`Aconteceu um erro no DELETE: ${error}`)
        }
    }
}