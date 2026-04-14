
// Importar as funções do Model
const QuestaoModel = require('../Models/questoesModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /questoes
// ============================================================
async function listarTodos(req, res) {
  try {
    const questoes = await QuestaoModel.listarTodos();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar questões', 
      erro: erro.message 
    });
  }
}

async function listarView(req, res) {
  try {
    const questoes = await QuestaoModel.listarView();
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar a view de questões e tópicos', 
      erro: erro.message 
    });
  }
}





async function buscarPorpalavra(req, res) {
  try {
    const palavra = req.params.palavra;
    const questoes = await QuestaoModel.buscarPorpalavra(palavra);
    res.status(200).json(questoes);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar questões por palavra',
      erro: erro.message 
    });
  }
}
// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /questoes/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const questao = await QuestaoModel.buscarPorId(id);
    
    if (questao) {
      res.status(200).json(questao);
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar questão',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /questoes
// ============================================================
async function criar(req, res) {
  try {
    const { enunciado, resposta, linkBib, dtpesq, topid } = req.body;
    
    if (!enunciado || !resposta || !topid) {
      return res.status(400).json({ 
        mensagem: 'enunciado, resposta e topid são obrigatórios' 
      });
    }
    
    const novaQuestao = await QuestaoModel.criar({ 
      enunciado, 
      resposta, 
      linkBib, 
      dtpesq, 
      topid 
    });
    
    res.status(201).json(novaQuestao);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar questão',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /questoes/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { enunciado, resposta, linkBib, dtpesq, topid } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!enunciado || !resposta || !topid) {
      return res.status(400).json({ 
        mensagem: 'enunciado, resposta e topid são obrigatórios' 
      });
    }
    
    const questaoAtualizada = await QuestaoModel.atualizar(id, { 
      enunciado, 
      resposta, 
      linkBib, 
      dtpesq, 
      topid 
    });
    
    if (questaoAtualizada) {
      res.status(200).json(questaoAtualizada);
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar questão',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /questoes/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await QuestaoModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Questão ${id} removida com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Questão ${id} não encontrada` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar questão',
      erro: erro.message 
    });
  }
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  listarView,
  buscarPorpalavra
};