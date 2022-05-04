const models = require('../models')

module.exports = {

    async store(req, res) {
        try {

            const {
                resposta,
                resposta_valida,
                pergunta_id = req.params.id
            } = req.body

            const pergunta = await models.Perguntas.findByPk(pergunta_id)

            if (pergunta != null) {
                const createdResposta = await models.Respostas.create({
                    resposta,
                    resposta_valida,
                    pergunta_id
                })

                return res.status(200).json({
                    message: 'Resposta cadastrada',
                    pergunta,
                    createdResposta
                })
            }

            return res.status(404).json({
                messsage: 'Pergunta não encontrada'
            })
        } catch (error) {
            console.log(error)
        }
    },

    async index(req, res) {
        try {
            const pergunta = req.query.pergunta

            if (!pergunta) {
                const { count, rows } = await models.Respostas.findAndCountAll()

                if (count === 0) {
                    return res.status(404).json({
                        message: 'Respostas não encontradas/cadastradas'
                    })
                }

                return res.status(200).json({
                    message: 'Respostas localizadas',
                    count,
                    rows
                })
            }

            const perguntaPesquisada = await models.Perguntas.findByPk(pergunta)
            const pergunta_id = pergunta
            const respostas = await models.Respostas.findAll({
                where: { pergunta_id }
            })

            if (respostas.length == 0) {
                return res.status(200).json({
                    message: 'Pergunta não cadastrada ou resposta não encontrada',
                })
            }

            return res.status(200).json({
                message: 'Respostas localizadas',
                perguntaPesquisada,
                respostas
            })
        } catch (error) {
            console.log(error)
        }
    },

    async update(req, res) {
        try {
            const { pergunta, resposta } = req.query
            const campoAtualizar = req.body

            console.log(pergunta, resposta)

            if (!pergunta) {
                return res.status(404).json({
                    message: "Pergunta não pode ser encontrada"
                })
            }

            const pergunta_id = pergunta
            console.log(pergunta_id)

            const respostas = await models.Respostas.findAll({
                where: { pergunta_id }
            })

            if (respostas.length == 0) {
                return res.status(404).json({
                    message: "Resposta(s) não encontrada(s)"
                })
            }

            const respostaAtualizar = respostas.find(resp => resp.id == resposta)

            if (respostaAtualizar) {
                await respostaAtualizar.update(campoAtualizar)
                return res.status(200).json({
                    message: "Resposta atualizada com sucesso!"
                })
            }

            return res.status(500).json({
                message: 'Contate o Administrador'
            })



        } catch (error) {
            console.log(`Ocorreu um erro ao Atualizar a Resposta: ${error}`)
        }
    },

    async delete(req, res) {
        try {
            const { pergunta, resposta } = req.query
            console.log(pergunta, resposta)

            if (!pergunta) {
                return res.status(404).json({
                    message: "Pergunta não pode ser encontrada"
                })
            }

            const pergunta_id = pergunta
            console.log(pergunta_id)

            const respostas = await models.Respostas.findAll({
                where: { pergunta_id }
            })

            if (respostas.length == 0) {
                return res.status(404).json({
                    message: "Resposta(s) não encontrada(s)"
                })
            }

            const respostaApagada = respostas.find(resp => resp.id == resposta)

            if (respostaApagada) {
                await respostaApagada.destroy()
                return res.status(200).json({
                    message: "Resposta deletada com sucesso!"
                })
            }

            return res.status(404).json({
                message: 'Resposta apagada ou não encontrada'
            })



        } catch (error) {
            console.log(`Ocorreu um erro ao Deletar: ${error}`)
        }
    }
}