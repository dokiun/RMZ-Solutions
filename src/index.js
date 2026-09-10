const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/work', (req, res) => {
  res.render('work');
});

app.get('/api/contact', (req, res) => {
  res.json({ message: 'Contact form endpoint' });
});

// POST endpoint for contact form
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  // Aquí iría la lógica para procesar el formulario
  // Por ahora solo respondemos con éxito
  console.log('Contact form received:', { name, email, phone, message });
  
  res.json({ success: true, message: 'Mensaje recibido correctamente' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('404');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
