const router = require('express').Router()
const respostaController = require('../controller/RespostaController')

router.get('/', respostaController.index)
// router.get('/:id', respostaController.show)
router.post('/add/:id', respostaController.store)
router.put('/edit', respostaController.update)
router.delete('/del', respostaController.delete)

module.exports = router