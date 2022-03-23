const db = require("../database/connection")

module.exports = class AnswerModel{

    /**
     * lista todas as respostas
     * @param {*} callback 
     * @returns 
     */
    static getAll(callback){
        return db.query("SELECT * FROM answer", callback)
    }

    /**
     * Lista todas as opcoes de RESPOSTAS de uma PERGUNTA.
     * @param {*} question_id 
     * @param {*} callback 
     * @returns 
     */
    static listByQuestion(question_id, callback){
        return db.query("SELECT * FROM answer AS a WHERE a.question_id = ? ", [question_id], callback)
    }

    /**
     * lista uma resposta especifica
     * @param {*} id 
     * @param {*} callback 
     * @returns 
     */
    static get(id, callback){
        return db.query("SELECT * FROM answer AS a WHERE a.id = ?", [id], callback)
    }
    
    /**
     * insere uma resposta
     * @param {*} q 
     * @param {*} callback 
     * @returns 
     */
    static insert(q, callback){
        return db.query("INSERT INTO answer (description, question_id, status) VALUES(?,?,?)",
        [q.description, q.question_id, q.status], callback)
    }

    /**
     * edita os dados de uma resposta
     * @param {*} q 
     * @param {*} callback 
     * @returns 
     */
    static edit(question, callback){
        return db.query("UPDATE answer SET description = ?, question_id = ?, status = ? WHERE id = ? ",
        [question.description, question.question_id, question.status, question.id], callback)
    }

    /**
     * deleta uma resposta
     * @param {*} id 
     * @param {*} callback 
     * @returns 
     */
    static delete(id, callback){
        return db.query("DELETE FROM answer WHERE id = ?", [id], callback)
    }
}
