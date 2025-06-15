const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());

// Connexion à la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin', // Remplacez par votre utilisateur MySQL
    password: 'admin', // Remplacez par votre mot de passe MySQL
    database: 'student_management_db',
    port: '3306'
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


app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

//app.listen(8080, '127.0.0.1', () => {
//  console.log('Serveur en cours d\'exécution sur http://127.0.0.1:8080');
//  });
  
