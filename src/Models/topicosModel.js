
// Importar o pool de conexões do PostgreSQL
const pool = require('../Config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todos os tópicos do banco
// ============================================================
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM topicos ORDER BY idt'
  );
  
  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca um tópico específico pelo ID
// ============================================================
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM topicos WHERE idt = $1',
    [id]
  );
  
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere um novo tópico no banco
// ============================================================
async function criar(dados) {
  const { idt, nomet, disciplina, professor } = dados;
  
  const sql = `
    INSERT INTO topicos (idt, nomet, disciplina, professor)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(sql, [
    idt,
    nomet,
    disciplina,
    professor
  ]);
  
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza os dados de um tópico
// ============================================================
async function atualizar(id, dados) {
  const { idt, nomet, disciplina, professor } = dados;
  
  const sql = `
    UPDATE topicos
    SET idt = $1,
        nomet = $2,
        disciplina = $3,
        professor = $4
    WHERE idt = $5
    RETURNING *
  `;
  
  const result = await pool.query(sql, [
    idt,
    nomet,
    disciplina,
    professor,
    id
  ]);
  
  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove um tópico do banco
// ============================================================
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM topicos WHERE idt = $1',
    [id]
  );
  
  return result.rowCount > 0;
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