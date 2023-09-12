const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

//JSON -> OBJECT
app.use(cors())
app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: '161.246.127.24',
    port: '9056',
    user: 'admin',
    password: 'admin',
    database: 'jonkfood'
})

// CHECK connection
connection.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected to MySQL')
    }
})

// Setting Session
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
  }))

// REGISTER ROUTE
app.post('/register', async (req, res) => {
    try {
        const { username, password, confirm_password, email, tel, type } = req.body

        if (password != confirm_password) {
            return res.status(400).send('รหัสผ่านไม่ตรงกัน')
        }

        connection.query("INSERT INTO users(username, password, email, tel, type) VALUES(?, ?, ?, ?, ?)",
            [username, password, email, tel, type]) // เพิ่มลงใน Database
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง MySQL')
            res.send('สมัครสมาชิกสำเร็จ')
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลผู้ใช้:', error.message) // แสดง error ให้ dev ทราบ
        res.status(500).send('เกิดข้อผิดพลาดในการสมัครสมาชิก') // แสดง error ให้ client ทราบ
    }
})

// LOGIN ROUTE
app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body
    
        connection.query("SELECT * FROM users WHERE username = ? AND password = ?", // ค้นหาผู้ใช้
            [username, password], (error, result) => {
                if (result.length > 0) {
                    console.log(result, 'ได้ทำการเข้าสู่ระบบ')
                    res.send('เข้าสู่ระบบสำเร็จ')
                } else {
                    console.error('เข้าสู่ระบบไม่ได้:', error.message)
                    res.send('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
                }
            })
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', err.message)
        res.status(500).send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
    }
})

// MENU PAGE แสดงหน้าเมนู
app.get('/menu', async (req, res) => {
    res.sendFile(__dirname + '/menu.html')
})

// MENU LIST PAGE แสดงหน้ารวมรายการที่ส่ง
app.get('/menulist', async (req, res) => {
    res.sendFile(__dirname + '/menulist.html')
})

// Session for request Order
app.use((req, res, next) => {
    if (!req.session.order) {
      req.session.order = []
    }
    next()
})

// ORDER ROUTE
app.post('/order', async (req, res) => {
    const items = req.body.food // รับรายการที่เลือก
    req.session.order.push(...items) // เพิ่มรายการลงในตะกร้า
    res.sendFile(__dirname + '/confirm.html')
})

// CONFIRM ROUTE
app.post('/confirm', async (req, res) => {
    try {
        const { customer_id, comment, menu_id, history_id } = req.body
        const orderItems = req.session.order // รับรายการอาหารที่เลือกในตะกร้า

        connection.query("INSERT INTO reserve(customer_id, comment, menu_id, items, history_id, total) VALUES(?, ?, ?, ?, ?, ?)",
            [customer_id, comment, menu_id, orderItems, history_id, total])
                console.log('Successfully')
                res.send('Your Order has been added to queue')
    } catch (error) {
        console.error(err.message)
        res.status(500).send("Cannot Insert to Queue")
    }
    req.session.order = [] // ล้างตะกร้าหลังยืนยันการสั่ง
})

// CLEAR ORDER FUNCTION
let cart = [];
function clearOrder() {
    cart = [];
}

// CLEAR ORDER ROUTES
app.get('/store', async (req, res) => {
    clearOrder();
})

// READ Login
// app.get('/login', async (req, res) => {
//     try {
//         const result = connection.query("SELECT * FROM users")
//         res.json(result[0])
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({error: 'error'})
//     }
// })

//LISTEN
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
