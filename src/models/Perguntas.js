module.exports = (sequelize, DataTypes) => {
    const Perguntas = sequelize.define('Perguntas', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: true,
            primaryKey: true
        },
        pergunta: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'perguntas'
    })
   
    return Perguntas
}