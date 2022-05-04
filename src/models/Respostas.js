module.exports = (sequelize, DataTypes) => {
    const Respostas = sequelize.define('Respostas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        resposta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        resposta_valida: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pergunta_id:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'respostas'
    })
   
    return Respostas
}