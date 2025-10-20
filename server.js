const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// --- BANCO DE DADOS EM MEMÓRIA (SIMULADO) ---
// Em um projeto real, estes dados viriam de um banco de dados como PostgreSQL, MongoDB, etc.
let MOCK_USERS = [
    { id: 1, name: 'Dr. João Silva', email: 'profissional@email.com', password: '123', role: 'profissional', status: 'active' },
    { id: 2, name: 'Ana Costa (Secretária)', email: 'secretario@email.com', password: '123', role: 'secretario', status: 'active' },
    { id: 3, name: 'Maria Souza (Admin)', email: 'admin@email.com', password: '123', role: 'admin', status: 'active' },
];

let MOCK_PATIENTS = [
    { id: 1, name: 'Jaeffson Sabino', cpf: '123.456.789-00', susCard: '', observations: 'Hipertenso', generalNotes: 'Monitorar pressão arterial semanalmente.', createdAt: '2025-10-18', status: 'Ativo' },
    { id: 2, name: 'Maria Oliveira', cpf: '', susCard: '898001020304050', observations: 'Diabética tipo 2', generalNotes: 'Alergia a penicilina.', createdAt: '2025-09-01', status: 'Ativo' },
    { id: 3, name: 'Carlos Pereira', cpf: '111.222.333-44', susCard: '', observations: 'Asmático', generalNotes: '', createdAt: '2025-10-20', status: 'Pendente' },
];

let MOCK_MEDICATIONS = [
    { id: 1, name: 'Losartana', createdAt: '2025-01-10' },
    { id: 2, name: 'AAS', createdAt: '2025-01-10' },
    { id: 3, name: 'Metformina', createdAt: '2025-02-15' },
    { id: 4, name: 'Salbutamol', createdAt: '2025-03-20' },
    { id: 5, name: 'Glibenclamida', createdAt: '2025-04-05' },
];

let MOCK_RECORDS = [
    { id: 1, patientId: 1, professionalId: 1, medications: [{ recordMedId: `rec-med-1-1`, medicationId: 1, quantity: '1 cx', value: 15.00 }, { recordMedId: `rec-med-1-2`, medicationId: 2, quantity: '1 cx', value: 8.50 }], referenceDate: '2025-10-18', observation: 'Pressão controlada', totalValue: 23.50, status: 'Atendido', entryDate: '2025-10-18T10:00:00Z', deliveryDate: '2025-10-18T14:30:00Z' },
    { id: 2, patientId: 1, professionalId: 1, medications: [{ recordMedId: `rec-med-2-1`, medicationId: 1, quantity: '1 cx', value: 15.00 }], referenceDate: '2025-09-15', observation: 'Início do tratamento', totalValue: 80.00, status: 'Atendido', entryDate: '2025-09-15T11:00:00Z', deliveryDate: '2025-09-16T09:00:00Z' },
    { id: 3, patientId: 2, professionalId: 1, medications: [{ recordMedId: `rec-med-3-1`, medicationId: 3, quantity: '3 cxs', value: 22.00 }], referenceDate: '2025-10-10', observation: 'Glicemia estável', totalValue: 130.00, status: 'Atendido', entryDate: '2025-10-10T08:00:00Z', deliveryDate: '2025-10-10T08:30:00Z' },
];

// --- ROTAS DA API (Endpoints) ---

// Rota de Teste
app.get('/', (req, res) => {
  res.send('API do SysMed está funcionando!');
});

// Pacientes (Patients)
app.get('/api/patients', (req, res) => res.json(MOCK_PATIENTS));

app.post('/api/patients', (req, res) => {
  const newPatient = { id: Date.now(), ...req.body, createdAt: new Date().toISOString() };
  MOCK_PATIENTS.push(newPatient);
  res.status(201).json(newPatient);
});

app.put('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  const patientIndex = MOCK_PATIENTS.findIndex(p => p.id == id);
  if (patientIndex === -1) {
    return res.status(404).json({ message: 'Paciente não encontrado' });
  }
  const updatedPatient = { ...MOCK_PATIENTS[patientIndex], ...req.body };
  MOCK_PATIENTS[patientIndex] = updatedPatient;
  res.json(updatedPatient);
});

app.delete('/api/patients/:id', (req, res) => {
  const { id } = req.params;
  MOCK_PATIENTS = MOCK_PATIENTS.filter(p => p.id != id);
  res.status(204).send();
});


// Registros (Records)
app.get('/api/records', (req, res) => res.json(MOCK_RECORDS));

app.post('/api/records', (req, res) => {
  const newRecord = { id: Date.now(), ...req.body, entryDate: new Date().toISOString() };
  MOCK_RECORDS.push(newRecord);
  res.status(201).json(newRecord);
});

app.put('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const recordIndex = MOCK_RECORDS.findIndex(r => r.id == id);
  if (recordIndex === -1) {
    return res.status(404).json({ message: 'Registro não encontrado' });
  }
  const updatedRecord = { ...MOCK_RECORDS[recordIndex], ...req.body };
  MOCK_RECORDS[recordIndex] = updatedRecord;
  res.json(updatedRecord);
});

app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  MOCK_RECORDS = MOCK_RECORDS.filter(r => r.id != id);
  res.status(204).send();
});


// Medicações (Medications)
app.get('/api/medications', (req, res) => res.json(MOCK_MEDICATIONS));

// Usuários (Users)
app.get('/api/users', (req, res) => res.json(MOCK_USERS));


// --- INICIAR O SERVIDOR ---
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
