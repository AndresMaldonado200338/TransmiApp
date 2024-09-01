const express = require('express');
const file = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

const dataFilePath = path.join(__dirname, 'Data', 'Data.json');

app.use(express.json());
app.use(cors()); // Permite peticiones desde cualquier origen (CORS) 

app.get('/buses', (req, res) => {
  const buses = JSON.parse(file.readFileSync(dataFilePath, 'utf-8'));
  res.json(buses);
});

app.get('/buses/:placa', (req, res) => {
  const { placa } = req.params; 
  const buses = JSON.parse(file.readFileSync(dataFilePath, 'utf-8'));
  const bus = buses.find(bus => bus.placa === placa);

  if (!bus) {
    return res.status(404).json({ message: 'Bus no encontrado.' });
  }

  res.status(200).json(bus);
});

app.post('/buses', (req, res) => {
  const { placa, tiempoLlegada } = req.body;
  const buses = JSON.parse(file.readFileSync(dataFilePath, 'utf-8'));

  if (buses.some(bus => bus.placa === placa)) {
    return res.status(400).json({ message: 'Bus ya registrado.' });
  }

  const newBus = { placa, tiempoLlegada, editado: 0 };
  buses.push(newBus);

  file.writeFileSync(dataFilePath, JSON.stringify(buses, null, 2));
  res.status(201).json(newBus);
});

app.put('/buses/:placa', (req, res) => {
  const { placa } = req.params;
  const { tiempoLlegada } = req.body;
  const buses = JSON.parse(file.readFileSync(dataFilePath, 'utf-8'));
  const busIndex = buses.findIndex(bus => bus.placa === placa);

  if (busIndex === -1) {
    return res.status(404).json({ message: 'Bus no encontrado.' });
  }

  buses[busIndex].tiempoLlegada = tiempoLlegada;
  buses[busIndex].editado += 1;

  file.writeFileSync(dataFilePath, JSON.stringify(buses, null, 2));
  res.status(200).json(buses[busIndex]);
});

app.delete('/buses/:placa', (req, res) => {
  const { placa } = req.params;
  const buses = JSON.parse(file.readFileSync(dataFilePath, 'utf-8'));
  const updatedBuses = buses.filter(bus => bus.placa !== placa);

  if (updatedBuses.length === buses.length) {
    return res.status(404).json({ message: 'Bus no encontrado.' });
  }

  file.writeFileSync(dataFilePath, JSON.stringify(updatedBuses, null, 2));
  res.status(200).json({ message: 'Bus eliminado exitosamente.' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
