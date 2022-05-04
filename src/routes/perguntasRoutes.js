const router = require('express').Router()
const perguntaController = require('../controller/PerguntaController')

router.get('/', perguntaController.index)
router.post('/add', perguntaController.store)
router.put('/edit/:id', perguntaController.update)
router.delete('/del/:id', perguntaController.delete)

module.exports = router