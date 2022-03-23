const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const api = express()
const port = 3000
const router = express.Router()
const questionRouter = require("./router/questionRouter")
const answerRouter = require("./router/answerRouter")

api.use(cors())

api.use(express.json())
api.use(express.urlencoded({express: true}))

router.get("/", (req, res) => res.json({
    msg: "API Online!"
}))

api.use("/", router)

api.use("/question", questionRouter)
api.use("/answer", answerRouter)
api.use("/question/answer", answerRouter)

api.listen(port)
console.log("Run api...")
