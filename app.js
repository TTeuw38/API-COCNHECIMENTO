require('dotenv').config();

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// ============================================================
// ROTAS
// ============================================================

// Tópicos
const topicosRoutes = require('./src/Routes/topicosRoute');
app.use('/topicos', topicosRoutes);

// Questões
const questoesRoutes = require('./src/Routes/questoesRoute');
app.use('/questoes', questoesRoutes);

// ============================================================
// ROTA RAIZ
// ============================================================

app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Tópicos e Questões com PostgreSQL',
    versao: '1.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL',
    endpoints: {
      topicos: '/topicos',
      questoes: '/questoes'
    }
  });
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('='.repeat(70));
  console.log('🚀 Servidor rodando com sucesso!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('');
  console.log('📌 Endpoints disponíveis:');
  console.log('      Tópicos: /topicos');
  console.log('      Questões: /questoes');
  console.log('='.repeat(70));
});