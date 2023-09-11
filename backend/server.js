const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

//JSON -> OBJECT
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '161.246.127.24',
    port: '9056', 
    user: 'admin',
    password: 'admin',
    database: 'jonkfood'
});

// CHECK connection
connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Connected to MySQL');
    }
});

// REGISTER ROUTES
app.post('/register', async (req, res) => {
    try {
        const { username, password, email, tel, type } = req.body;
        connection.query("INSERT INTO users(username, password, email, tel, type) VALUES(?, ?, ?, ?, ?)",
            [username, password, email, tel, type]) //insert into sql
            res.json({
                message: 'insert successfully'
            })
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message})
    }
})

// READ Login
app.get('/login', async (req, res) => {
    try {
        const result = connection.query("SELECT * FROM users")
        res.json(result[0])
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: 'error'})
    }
});

//LISTEN
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
