const express = require('express');
const dotenv = require('dotenv');
const app = express(); // backend/server.js
const db = require('./config/db'); // Conexão com banco de dados
const cors = require('cors');
const bodyParser = require('body-parser');

// Configuração de variáveis de ambiente
dotenv.config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas básicas
app.get('/', (req, res) => {
  res.send(`'Backend está funcionando!'`);
});

// Importando rotas
const balizamentoRoutes = require('./routes/balizamentoRoutes');
const equipesRoutes = require('./routes/equipesRoutes');
const etapasRoutes = require('./routes/etapasRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const nadadoresRoutes = require('./routes/nadadoresRoutes');
const inscricaoRoutes = require('./routes/inscricaoRoutes');
const rankingsRoutes = require('./routes/rankingsRoutes');
const uploadRoutes = require('./uploads');
const migracao = require('./routes/migracaoRoute');

app.use('/api/balizamento', balizamentoRoutes);
app.use('/api/equipes', equipesRoutes);
app.use('/api/etapas', etapasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/nadadores', nadadoresRoutes);
app.use('/api/inscricao', inscricaoRoutes);
app.use('/api/rankings', rankingsRoutes);
app.use(uploadRoutes);
app.use('/api/migracao', migracao);

// Página não encontrada
app.use((req, res) => {
  res.status(404).send('Desculpe, não pode passar por aqui!');
});

// Inicializa o servidor apenas localmente ou no Vercel
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'desenvolvimento'}`);
  });
}

// Exporta o app para uso em Serverless Functions
module.exports = app;
