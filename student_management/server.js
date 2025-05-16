const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Remplacez par votre utilisateur MySQL
    password: '', // Remplacez par votre mot de passe MySQL
    database: 'student_management_db',
    port: '3309'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connecté à la base de données MySQL.');
});

// CRUD Endpoints
app.post('/students', (req, res) => {
    const student = req.body;
    db.query('INSERT INTO students SET ?', student, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send(`Étudiant ajouté avec l'ID : ${result.insertId}`);
    });
});

app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const student = req.body;
    db.query('UPDATE students SET ? WHERE id = ?', [student, id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Étudiant mis à jour.');
    });
});

app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM students WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Étudiant supprimé.');
    });
});


app.listen(3000, '192.168.32.44', () => {
    console.log('Serveur en cours d\'exécution sur https://1b22-154-117-232-167.ngrok-free.app');
  });
  

//app.listen(port, () => {
//    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
//});