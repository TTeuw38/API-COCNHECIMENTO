// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const topicoscontroller = require('../Controller/topicosController');

// ============================================================
// DEFINIÇÃO DAS ROTAS PARA TÓPICOS
// ============================================================

// GET /topicos - Listar todos os tópicos
router.get('/', topicoscontroller.listarTodos);

// GET /topicos/:id - Buscar tópico específico por ID
router.get('/:id', topicoscontroller.buscarPorId);

// POST /topicos - Criar novo tópico
router.post('/', topicoscontroller.criar);

// PUT /topicos/:id - Atualizar tópico completo
router.put('/:id', topicoscontroller.atualizar);

// DELETE /topicos/:id - Deletar tópico
router.delete('/:id', topicoscontroller.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;