const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const { error } = require('console');
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(express.static(path.join(__dirname, '../frontend')))

// New connection
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


// HOMEPAGE
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'))
})

// ------------ REGISTER SECTION ------------
// REGISTER ROUTE
app.post('/user/register', async (req, res) => {
    try {
        const { first_name, last_name, username, password, confirm_password, email, tel } = req.body
        const type = "customer"
        if (password != confirm_password) {
            return res.send('รหัสผ่านไม่ตรงกัน')
        }
        
        // เพิ่มผู้ใช้ใหม่ลงในตาราง USERS
        const userResult = await connection.promise().query("INSERT INTO users(username, password, email, tel, type) VALUES(?, ?, ?, ?, ?)",
        [username, password, email, tel, type])
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง Users')
            
        // ดึง user_id จากตาราง users
        const user_id = userResult[0].insertId

        // เพิ่มผู้ใช้ใหม่ลงในตาราง CUSTOMER
        const customerResult = await connection.promise().query("INSERT INTO customer(user_id, first_name, last_name, stu_id) VALUES(?, ?, ?, ?)",
        [user_id, first_name, last_name, username])
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง Customer')
            return res.send('ลงทะเบียนสำเร็จ')
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลผู้ใช้:', error.message)
        return res.status(500).send('เกิดข้อผิดพลาดในการสมัครสมาชิก')
    }
})

app.post('/shop/register', async (req, res) => {
    try {
        const { shop_name, username,  password, confirm_password, email, tel } = req.body
        const type = "shop"
        if (password != confirm_password) {
            return res.send('รหัสผ่านไม่ตรงกัน')
        }
        
        // เพิ่มผู้ใช้ใหม่ลงในตาราง USERS
        const userResult = await connection.promise().query("INSERT INTO users(username, password, email, tel, type) VALUES(?, ?, ?, ?, ?)",
        [username, password, email, tel, type])
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง Users')
        
        // ดึง user_id จากตาราง users
        const user_id = userResult[0].insertId

        // เพิ่มผู้ใช้ใหม่ลงในตาราง SHOP
        const shopResult = await connection.promise().query("INSERT INTO shop(user_id, shop_name) VALUES(?, ?)", [user_id, shop_name])
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง Shop')
            return res.send('ลงทะเบียนสำเร็จ')
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเพิ่มข้อมูลผู้ใช้:', error.message)
        return res.status(500).send('เกิดข้อผิดพลาดในการสมัครสมาชิก')
    }
})



// ------------ LOGIN SECTION ------------
// LOGIN ROUTE
app.post('/user/login', async (req, res) => {
    try {
        const { username, password } = req.body
        
        const [rows] = await connection.promise().query("SELECT * FROM users WHERE username = ? AND password = ?", // ค้นหาผู้ใช้ customer
        [username, password])
            if (rows.length === 1) {
                req.session.user = rows[0]
                console.log('Customer ได้ทำการเข้าสู่ระบบ')
                res.send('เข้าสู่ระบบสำเร็จ')
            } else {
                res.send('เข้าสู่ระบบไม่สำเร็จ')
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error.message)
            return res.status(500).send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
    }
})

app.post('/shop/login', async (req, res) => {
    try {
        const { username, password } = req.body
        
        const [rows] = await connection.promise().query("SELECT * FROM users WHERE username = ? AND password = ?", // ค้นหาผู้ใช้ shop
        [username, password])
            if (rows.length === 1) {
                req.session.user = rows[0]
                res.send('เข้าสู่ระบบสำเร็จ')
                console.log('Shop ได้ทำการเข้าสู่ระบบ')
            } else {
                res.send('เข้าสู่ระบบไม่สำเร็จ')
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error.message)
            return res.status(500).send('เกิดข้อผิดพลาดในการเข้าสู่ระบบ')
    }
})


// ------------ PROFILE SECTION ------------
app.get('/user/profile', async (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '../frontend/User/UserProfile.html'))
    } else {
        res.sendFile(path.join(__dirname, '../frontend/User/LoginUser.html'))
    }
})

app.get('/user/edit-profile', async (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, '../frontend/User/UserProfileEdit.html'))
        try {
            const user_id = req.session.user.id;

            const [userData] = await connection.promise().query("SELECT email, tel FROM users WHERE user_id = ?", [user_id])
            const [customerData] = await connection.promise().query("SELECT first_name, last_name FROM customer WHERE user_id = ?", [user_id])

            res.render('/user/edit-profile', { userData, customerData }); // ส่งข้อมูลไปยังหน้าแก้ไขโปรไฟล์
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์: ' + error.message);
            res.status(500).send('เกิดข้อผิดพลาดในการดึงข้อมูลโปรไฟล์');
        }
    } else {
        res.sendFile(path.join(__dirname, '../frontend/User/LoginUser.html'))
    }
})

app.post('/user/edit-profile', async (req, res) => {
    try {
        const { first_name, last_name, tel, email } = req.body
        const user_id = req.session.user.id // รับข้อมูลผู่ใช้จาก session

        await connection.promise().query("UPDATE users SET email = ?, tel ? WHERE user_id = ?", [email, tel, user_id])
        await connection.promise().query("UPDATE customer SET first_name = ?, last_name ? WHERE user_id = ?", [first_name, last_name, user_id])
        console.log('บันทึกการแก้ไขโปรไฟล์สำเร็จ')
        res.send('บันทึกการแก้ไขโปรไฟล์สำเร็จ')
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึกการแก้ไขโปรไฟล์: ' + error.message)
        res.status(500).send('เกิดข้อผิดพลาดในการบันทึกการแก้ไขโปรไฟล์')
    }
})


// ------------ MENU SECTION ------------
// Session for request Order
app.use((req, res, next) => {
    if (!req.session.order) {
      req.session.order = []
    }
    next()
})

// ตรวจสอบการล็อกอินในหน้าจองอาหาร
app.get('/dashboard/user', async (req, res) => {
    if (req.session.username) {
        res.sendFile(__dirname + '/reservation.html')
    } else {
        res.redirect('/login')
    }
})

// ADD TO CART
app.post('/add-to-cart', async (req, res) => {
    try {
        const { customer_id, menu_id, reserve_id, date, time } = req.body

        connection.query("INSERT INTO booking(customer_id, menu_id, reserve_id, date, time) VALUES (?, ?, ?, ?, ?)",
        [customer_id, menu_id, reserve_id, date, time], (error, result) => {
            console.log('เพิ่มรายการลงในตะกร้าเรียบร้อย')
            return res.status(200).send()
        })

    } catch (error) {
        console.error('เพิ่มอาหารลงตะกร้าไม่สำเร็จ:', error.message)
        return res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มอาหารลงตะกร้า')
    }
})

// EDIT CART
app.put('/edit-cart', async (req, res) => {
    try {
        const { booking_id, items } = req.body;

        connection.query("UPDATE booking SET items = ? WHERE booking_id = ?",
        [items, booking_id], (error, result) => {
            console.log('ตะกร้าถูกอัปเดต เพิ่ม/ลดเมนูสำเร็จ')
            return res.status(200).send('ตะกร้าถูกอัปเดตแล้ว')
        })
    } catch (error) {
        console.error('ตะกร้าไม่ถูกอัปเดต อาจเกิดข้อผิดพลาด:', error.message)
        return res.status(500).send('เกิดข้อผิดพลาดในการแก้ไขเมนูในตะกร้า')
    }
})

// CONFIRM CART
app.post('/confirm', async (req, res) => {
    try {
        // รับข้อมูลมาจากตะกร้าในตาราง booking และบันทึกลงในตาราง reserve
        const { customer_id, history_id, total } = req.body
        connection.query("INSERT INTO reserve(customer_id, menu_id, items, history_id, total) SELECT menu_id, items FROM booking",
        [customer_id, history_id, total], (error, result) => {
            console.log('รายการอาหารทำการจองคิว')
            return res.status(200).send('จองอาหารสำเร็จ')
        })
    } catch (error) {
        console.error('จองอาหารไม่สำเร็จ อาจเกิดข้อผิดพลาด:', error.message)
        return res.status(500).send('เกิดข้อผิดพลาดในการจองคิว')
    }
})

//LISTEN
app.listen(5000, () => {
    console.log('Server running on port 5000')
})
