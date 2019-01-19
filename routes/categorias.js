const express = require('express')
const router = express.Router()

const controller = require('../controllers/categorias')

router.get('/nova', controller.novaForm)

router.post('/nova', controller.nova)

router.get('/', controller.list)

router.get('/excluir/:id', controller.excluir)

router.post('/editar/:id', controller.editar)

router.get('/editar/:id', controller.editarForm)

module.exports = router