const mysql =  require("mysql")
const connection = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'test_beedoo'
})

module.exports = connection
