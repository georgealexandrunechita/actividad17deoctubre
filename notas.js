const express = require('express');
const app = express();

app.use(express.json());

let estudiantes = {
    "Luis": [7.8, 5, 9.3],
    "José": [5.6, 8, 2.5],
    "Laura": [8.2, 7.9, 9.4]
};

app.get('/estudiantes/:nombre/notas', (req, res) => {
    const nombre = req.params.nombre;
    const notas = estudiantes[nombre];

    if (!notas) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.json({ nombre: nombre, notas: notas });
});

app.post('estudiantes',  (req, res) => {
    const { nombre, notas} = req.body;

    if (estudiantes[nombre]) {
        return res.status(400)
    }

)

app.listen(8080, () => {
    console.log('Servidor arrancado en http://localhost:8080');
});
