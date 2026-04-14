// Importar o pool de conexões do PostgreSQL
const pool = require('../Config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todas as questões do banco
// ============================================================
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM questoes ORDER BY idq'
  );
  
  return result.rows;
}

async function listarView() {
  const result = await pool.query(
    'SELECT * FROM exercicios '
  );
  
  return result.rows;
}

async function buscarPorpalavra(palavra) {
  const result = await pool.query(
    `SELECT * FROM questoes WHERE enunciado ILIKE $1 OR resposta ILIKE $1`,
    [`%${palavra}%`]
  );

  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca uma questão específica pelo ID
// ============================================================
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM questoes WHERE idq = $1',
    [id]
  );
  
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere uma nova questão no banco
// ============================================================
async function criar(dados) {
  const { enunciado, resposta, linkBib, dtpesq, topid } = dados;
  
  const sql = `
    INSERT INTO questoes (enunciado, resposta, linkBib, dtpesq, topid)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const result = await pool.query(sql, [
    enunciado,
    resposta,
    linkBib,
    dtpesq,
    topid
  ]);
  
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza os dados de uma questão
// ============================================================
async function atualizar(id, dados) {
  const { enunciado, resposta, linkBib, dtpesq, topid } = dados;
  
  const sql = `
    UPDATE questoes
    SET enunciado = $1,
        resposta = $2,
        linkBib = $3,
        dtpesq = $4,
        topid = $5
    WHERE idq = $6
    RETURNING *
  `;
  
  const result = await pool.query(sql, [
    enunciado,
    resposta,
    linkBib,
    dtpesq,
    topid,
    id
  ]);
  
  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove uma questão do banco
// ============================================================
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM questoes WHERE idq = $1',
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
  deletar,
  listarView,
  buscarPorpalavra
};