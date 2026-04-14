// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

// Importar as funções do Controller
const questoescontroller = require('../Controller/questoesController');

// ============================================================
// DEFINIÇÃO DAS ROTAS PARA QUESTÕES
// ============================================================

// GET /questoes - Listar todas as questões
router.get('/', questoescontroller.listarTodos);
//=----------------listar view------=-//
router.get('/view', questoescontroller.listarView);
// GET /questoes/:id - Buscar questão específica por ID
router.get('/:id', questoescontroller.buscarPorId);

router.get('/buscar/:palavra', questoescontroller.buscarPorpalavra);

// POST /questoes - Criar nova questão
router.post('/', questoescontroller.criar);

// PUT /questoes/:id - Atualizar questão completa
router.put('/:id', questoescontroller.atualizar);

// DELETE /questoes/:id - Deletar questão
router.delete('/:id', questoescontroller.deletar);

// ============================================================
// EXPORTAR O ROUTER
// ============================================================
module.exports = router;