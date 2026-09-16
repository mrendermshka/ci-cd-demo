const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const rooms = [
  { id: 1, name: 'Standard', price: 1200 },
  { id: 2, name: 'Deluxe', price: 2500 },
];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/rooms', (req, res) => {
  const maxPrice = Number(req.query.maxPrice);
  if (!maxPrice) {
    return res.json(rooms);
  }
  res.json(rooms.filter((r) => r.price <= maxPrice));
});

app.get('/api/rooms/:id', (req, res) => {
  const room = rooms.find((r) => r.id === Number(req.params.id));
  if (!room) {
    return res.status(404).json({ error: 'Кімнату не знайдено' });
  }
  res.json(room);
});

app.post('/api/rooms', (req, res) => {
  const { name, price } = req.body;
  if (typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ error: 'Назва має містити щонайменше 3 символи' });
  }
  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Ціна має бути додатним числом' });
  }
  const room = { id: rooms.length + 1, name: name.trim(), price };
  rooms.push(room);
  res.status(201).json(room);
});

module.exports = app;
