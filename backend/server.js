const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();

//JSON -> OBJECT
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '192.168.1.37', 
    user: 'biwkung',
    password: '',
    database: 'jonk_food'
});

// CHECK connection
connection.connect((error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Connected to MySQL');
    }
});

// CREATE ROUTES
app.post('/create', async (req, res) => {
    try {
        const { username, password, email } = req.body;
        connection.query(
            "INSERT INTO users(username, password, email) VALUES(?, ?, ?)",
            [username, password, email], //insert into sql
            res.json({
                message: 'insert successfully'
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'error',
            error: error.message
        })
    };
});

// READ
app.get('/', (req, res) => {
    const data = {msg: 'Hello'};
    res.json(data);
});

//LISTEN
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
