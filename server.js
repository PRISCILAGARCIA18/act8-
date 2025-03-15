const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const superheroRoutes = require('./routes/superhero.routes');
require('dotenv').config();

const app = express();

// ✅ Habilitar CORS para evitar bloqueos en el frontend
app.use(cors());

// ✅ Middleware para manejar JSON
app.use(bodyParser.json());

// ✅ Servir archivos estáticos desde la carpeta "views"
app.use(express.static('views'));

// ✅ Ruta explícita para servir index.html correctamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ✅ Conectar con MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Error connecting to MongoDB:", err));

// ✅ Usar las rutas definidas en "routes/superhero.routes.js"
app.use('/superheroes', superheroRoutes);

// ✅ Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
