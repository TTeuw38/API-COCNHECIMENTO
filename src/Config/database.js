// ============================================================
// CONFIGURAÇÃO DO BANCO DE DADOS PostgreSQL COM DOTENV
// ============================================================

// Importar dotenv e carregar variáveis do arquivo .env
require('dotenv').config();

// Importar o Pool do PostgreSQL
const { Pool } = require('pg');

// ============================================================
// CONFIGURAR O POOL DE CONEXÕES
// ============================================================

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

// ============================================================
// TESTAR CONEXÃO
// ============================================================

pool.connect((erro, client, release) => {
  if (erro) {
    console.error('❌ Erro ao conectar ao PostgreSQL:', erro.message);
    console.error('💡 Verifique suas credenciais no arquivo .env');
  } else {
    console.log('✅ Conectado ao PostgreSQL!');
    console.log(`📊 Banco: ${process.env.DB_NAME}`);
    console.log(`🏠 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    release();
  }
});

// ============================================================
// EXPORTAR O POOL
// ============================================================

module.exports = pool;