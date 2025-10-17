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

    if (estudiantes.hasOwnProperty(nombre)) {
        res.json({ nombre, notas: estudiantes[nombre] });
    } else {
        res.status(404).send('Estudiante no encontrado');
    }
});

app.post('/estudiantes', (req, res) => {
    const { nombre, notas } = req.body;

    if (estudiantes.hasOwnProperty(nombre)) {
        res.status(400).json({ error: 'Estudiante ya existente' });
    } else {
        estudiantes[nombre] = notas;
        res.json({
            mensaje: 'Estudiante agregado correctamente',
            estudiante: { nombre, notas }
        });
    }
});

app.post('/estudiantes/:nombre/notas', (req, res) => {
        const nombre = req.params.nombre;
        const nota = Object.values(req.body)[0]
        estudiantes= [nombre].push(nota);
        res.send ("Nota añadida");
});

app.delete('/estudiantes/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    delete estudiantes[nombre];
    res.send ("Estudiante eliminado");
});

app.get('/estudiantes/:nombre/media', (req, res) => {
    const nombre = req.params.nombre;
    const notas = estudiantes[nombre];
    let suma = 0;

    for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
    }

    const media = suma / notas.length;
    res.json({ nombre, media });
});

app.listen(8080, () => {
    console.log('Servidor arrancado');
});
