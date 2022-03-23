const db = require("../database/connection")

module.exports = class QuestionModel{

    /**
     * lista todas as perguntas
     * @param {*} callback 
     * @returns 
     */
    static getAll(callback){
        return db.query("SELECT * FROM question", callback)
    }

    /**
     * Lista todas as PERGUNTAS com suas respectivas opcoes de RESPOSTA
     * @param {*} callback 
     * @returns 
     */
    static listQuestionWithAnswers( callback ){
        let sql = "SELECT a.id AS answer_id, a.description AS answer_desc, q.id AS question_id, q.description AS question_desc FROM question AS q LEFT JOIN answer AS a ON a.question_id = q.id "
        return db.query(sql, callback)
    }

    /**
     * lista uma pergunta especifica
     * @param {*} id 
     * @param {*} callback 
     * @returns 
     */
    static get(id, callback){
        return db.query("SELECT * FROM question AS q WHERE q.id = ?", [id], callback)
    }
    
    /**
     * insere uma pergunta
     * @param {*} q 
     * @param {*} callback 
     * @returns 
     */
    static insert(q, callback){
        return db.query("INSERT INTO question (description, status) VALUES(?,?)",
        [q.description, q.status], callback)
    }

    /**
     * edita os dados de uma pergunta
     * @param {*} q 
     * @param {*} callback 
     * @returns 
     */
    static edit(question, callback){
        return db.query("UPDATE question SET description = ?, status = ? WHERE id = ? ",
        [question.description, question.status, question.id], callback)
    }

    /**
     * deleta uma pergunta
     * @param {*} id 
     * @param {*} callback 
     * @returns 
     */
    static delete(id, callback){
        return db.query("DELETE FROM question WHERE id = ?", [id], callback)
    }
}
