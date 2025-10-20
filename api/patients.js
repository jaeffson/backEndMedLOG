import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // No caching in dev
  clientPromise = MongoClient.connect(uri, options);
} else {
  // Cache the connection in production
  if (!client) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('mydb'); // nome do banco que você criou

  if (req.method === 'POST') {
    const patient = req.body;
    try {
      const result = await db.collection('patients').insertOne(patient);
      res.status(201).json({ message: 'Paciente cadastrado', id: result.insertedId });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar paciente' });
    }
  } else if (req.method === 'GET') {
    try {
      const patients = await db.collection('patients').find({}).toArray();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar pacientes' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
