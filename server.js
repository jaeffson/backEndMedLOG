const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Exemplo de rota para buscar usuários (substituir com a lógica do banco de dados)
app.get('/api/users', (req, res) => {
  const MOCK_USERS = [
    { id: 1, name: 'Dr. João Silva', email: 'profissional@email.com', role: 'profissional', status: 'active' },
    // ... outros usuários
  ];
  res.json(MOCK_USERS);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

