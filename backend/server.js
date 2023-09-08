const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

//JSON -> OBJECT
app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3307', 
    user: 'biw',
    password: '',
    database: 'jonk food'
});

// CHECK connection
// connection.connect((err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('Connected to MySQL');
// });

// CREATE ROUTES
app.post('/create', async (req, res) => {

    const { email, name, password } = req.body;

    try {
        connection.query(
            "INSERT INTO users(email, fullname, password) VALUES(?, ?, ?)",
            [email, name, password], //insert into sql
            (err, results, fields) => { //parameter function
                if (err) {
                    console.log("Error inserting into database", err);
                    return res.status(400).send(); //Bad request
                }
                return res.status(201).json({ msg: "New User Successfully Added"});
            }
        )
    } catch (err) {
        console.log(err);
        return res.status(500).send();   
    }
});

// // READ
app.get('/home', (req, res) => {
    const data = {msg: 'Hello'};
    res.json(data);
});


//LISTEN
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
