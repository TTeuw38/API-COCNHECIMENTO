// Importar as funções do Model
const TopicoModel = require('../Models/topicosModel');

// ============================================================
// FUNÇÃO: listarTodos (ASSÍNCRONA)
// ROTA: GET /topicos
// ============================================================
async function listarTodos(req, res) {
  try {
    const topicos = await TopicoModel.listarTodos();
    res.status(200).json(topicos);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao listar tópicos', 
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId (ASSÍNCRONA)
// ROTA: GET /topicos/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const topico = await TopicoModel.buscarPorId(id);
    
    if (topico) {
      res.status(200).json(topico);
    } else {
      res.status(404).json({ 
        mensagem: `Tópico ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao buscar tópico',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: criar (ASSÍNCRONA)
// ROTA: POST /topicos
// ============================================================
async function criar(req, res) {
  try {
    const { idt, nomet, disciplina, professor } = req.body;
    
    if (!idt || !nomet || !disciplina || !professor) {
      return res.status(400).json({ 
        mensagem: 'idt,nomet, disciplina e professor são obrigatórios' 
      });
    }
    
    const novoTopico = await TopicoModel.criar({ 
      idt,
      nomet, 
      disciplina, 
      professor 
    });
    
    res.status(201).json(novoTopico);
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao criar tópico',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar (ASSÍNCRONA)
// ROTA: PUT /topicos/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { idt,nomet, disciplina, professor } = req.body;
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    if (!idt || !nomet || !disciplina || !professor) {
      return res.status(400).json({ 
        mensagem: 'idt,nomet, disciplina e professor são obrigatórios' 
      });
    }
    
    const topicoAtualizado = await TopicoModel.atualizar(id, { 
     idt,
      nomet, 
      disciplina, 
      professor 
    });
    
    if (topicoAtualizado) {
      res.status(200).json(topicoAtualizado);
    } else {
      res.status(404).json({ 
        mensagem: `Tópico ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao atualizar tópico',
      erro: erro.message 
    });
  }
}

// ============================================================
// FUNÇÃO: deletar (ASSÍNCRONA)
// ROTA: DELETE /topicos/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    
    if (isNaN(id)) {
      return res.status(400).json({ 
        mensagem: 'ID inválido' 
      });
    }
    
    const deletado = await TopicoModel.deletar(id);
    
    if (deletado) {
      res.status(200).json({ 
        mensagem: `Tópico ${id} removido com sucesso` 
      });
    } else {
      res.status(404).json({ 
        mensagem: `Tópico ${id} não encontrado` 
      });
    }
  } catch (erro) {
    res.status(500).json({ 
      mensagem: 'Erro ao deletar tópico',
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
  deletar
};