const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const multer = require('multer');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/picture/'); // บันทึกไฟล์ลงในโฟลเดอร์ uploads/
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // ตั้งชื่อไฟล์ชื่อเดิม
    }
});
const upload = multer({ storage })

app.use(bodyParser.json()) // to JSON
app.use(bodyParser.urlencoded({extended: true})) // อ่านข้อมูลจาก <form>
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

// ตรวจสอบการเข้าสู่ระบบ
function isAuthenticated(req, res, next) {
  if (req.session.loggedin) {
    return next();
  } else {
    res.sendFile(path.join(__dirname, '../frontend/login.html'))
  }
}

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

        const checkUsername = await connection.promise().query("SELECT * FROM users where username = ?", [username])
        if (checkUsername[0].length != 0) {
            // username ซ้ำ
            return res.send('มีชื่อผู้ใช้(Username)นี้แล้ว')
        }
        
        // เพิ่มผู้ใช้ใหม่ลงในตาราง USERS
        const userResult = await connection.promise().query("INSERT INTO users(username, password, email, tel, type) VALUES(?, ?, ?, ?, ?)",
        [username, password, email, tel, type])
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง Users')
            
        // ดึง user_id จากตาราง users
        const user_id = userResult[0].insertId

        // เพิ่มผู้ใช้ใหม่ลงในตาราง CUSTOMER
        const customerResult = await connection.promise().query("INSERT INTO customer(user_id, first_name, last_name) VALUES(?, ?, ?)",
        [user_id, first_name, last_name, username])
            console.log('สร้างบัญชีสำเร็จและทำการบันทึกลง Customer')
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
            if (rows.length === 1 && rows[0].type == 'customer') {
                req.session.loggedin = true
                req.session.username = rows[0]
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
            if (rows.length === 1 && rows[0].type == 'shop') {
                req.session.loggedin = true
                req.session.username = rows[0]
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
// PROFILE PAGE
app.get('/user/profile', isAuthenticated, async (req, res) => {
        const username = req.session.username.username
        connection.query(`SELECT first_name, last_name, username, tel, email 
                        FROM customer c 
                        JOIN users u 
                        ON (c.user_id = u.user_id) 
                        WHERE u.username = ?`, 
                        [username], (error, result) => {
                            if (result.length > 0) {
                                const userProfile = result[0]
                                res.json(userProfile)
                            }
                        })
})

// EDIT PROFILE
app.post('/user/editprofile', isAuthenticated, async (req, res) => {
        const username = req.session.username.username
        const { first_name, last_name, tel, email } = req.body
        connection.query(`UPDATE customer c
                        JOIN users u
                        ON (c.user_id = u.user_id)
                        SET c.first_name = ?, c.last_name = ?, u.tel = ?, u.email = ?
                        WHERE u.username = ?`, 
                        [first_name, last_name, tel, email, username], (error, result) => {
                            if (result.affectedRows > 0) {
                                return res.send('แก้ไขโปรไฟล์')
                            } else {
                                return res.send('เกิดข้อผิดพลาด')
                            }
                        })
})


// ------------ MENU SECTION ------------
// MENU PAGE
app.get('/user/menu', isAuthenticated, async (req, res) => {
        try {
            // ใช้ Axios เรียก API ของเจ้าของร้านเพื่อโหลดเมนูอาหาร
            const response = await axios.get('http://localhost:5000/shop/menu')
            const menu = response.data // เมนูอาหารจะอยู่ในรูปแบบ JSON
            res.json(menu) // ส่งเมนูอาหารกลับไปยังไคลเอนต์
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการโหลดเมนูอาหาร:', error);
            res.status(500).json({ error: 'ไม่สามารถโหลดเมนูอาหารได้' });
        }
})

const cart = [];

// ADD TO CART
app.post('/user/cart/add', isAuthenticated, async (req, res) => {
        const { customer_id, menu_id, reserve_id, items, cost } = req.body

        // เพิ่มเมนูลงตะกร้า
        cart[customer_id].push({ menu_id, items, cost })
        
        connection.query("INSERT INTO booking(customer_id, menu_id, reserve_id, items, cost) VALUES (?, ?, ?, ?, ?)",
        [customer_id, menu_id, reserve_id, JSON.stringify(items), cost], (error, result) => {
                // ลบรายการในตะกร้าหลังจากสั่งอาหารสำเร็จ
                cart.length = 0
        })
})
//     try {
//         const { customer_id, menu_id, reserve_id, date, time } = req.body

//         connection.query("INSERT INTO booking(customer_id, menu_id, reserve_id, date, time) VALUES (?, ?, ?, ?, ?)",
//         [customer_id, menu_id, reserve_id, date, time], (error, result) => {
//             console.log('เพิ่มรายการลงในตะกร้าเรียบร้อย')
//             return res.status(200).send()
//         })

//     } catch (error) {
//         console.error('เพิ่มอาหารลงตะกร้าไม่สำเร็จ:', error.message)
//         return res.status(500).send('เกิดข้อผิดพลาดในการเพิ่มอาหารลงตะกร้า')
//     }
// })

// CART PAGE
app.get('/user/cart', async (req, res) => {
    res.json(cart)
})

// EDIT CART
app.put('/edit-cart', isAuthenticated, async (req, res) => {
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
app.post('/user/confirm', isAuthenticated, async (req, res) => {
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

// SHOP MENU PAGE
app.get('/shop/menu', async (req, res) => {
    connection.query(`SELECT menu_id, menu_name, cost, i.image_path, category_id
                    FROM menu m
                    JOIN image i
                    USING (image_id)`, (error, result) => {
        console.log(result)
        res.json(result)
    })
})

app.get('/shop/menu/category/:categotyId', async (req, res) => {
    const category_id = req.params.categotyId

    connection.query(`SELECT menu_id, menu_name, cost, i.image_path, category_id
                    FROM menu
                    JOIN image i
                    USING (image_id)
                    WHERE category_id = ?`, [category_id], (error, result) => {
        console.log(result)
        res.json(result)
    })
})

// SHOP ADD MENU
app.post('/shop/menu/add', upload.any('image'), async (req, res) => {
    // ตรวจสอบข้อมูลเมนูอาหารและรูปภาพที่ส่งมาจากฟอร์ม
    const { menu_name, cost, category_id } = req.body
    const images = req.files
    const image_paths = images.map(image => image.filename)
    console.log({ menu_name, cost, category_id, image_paths })

    // บันทึกข้อมูลรูปภาพลงในตาราง image
    const imageInsertQueries = image_paths.map(image_path => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO image (image_path) VALUES (?)", [image_path], (error, result) => {
                    console.log("เพิ่มรูปภาพสำเร็จ");
                    resolve(result.insertId); // เมื่อบันทึกสำเร็จ ส่ง image_id กลับ
            });
        });
    });

    // รอสำเร็จของทุกคำสั่ง INSERT ของรูปภาพ
    Promise.all(imageInsertQueries)
        .then(imageIds => {
            // ตรวจสอบเมนูอาหารและบันทึกลงฐานข้อมูล
            const menuInsertQueries = imageIds.map((image_id, index) => {
                return new Promise((resolve, reject) => {
                    connection.query("INSERT INTO menu (shop_id, menu_name, cost, category_id, image_id) VALUES (?, ?, ?, ?, ?)", 
                        [1, menu_name[index], cost[index], category_id[index], image_id], (menuErr, menuResult) => {
                                console.log("เพิ่มเมนูสำเร็จ");
                                resolve(menuResult);
                    });
                });
            });

            // รอสำเร็จของทุกคำสั่ง INSERT ของเมนู
            return Promise.all(menuInsertQueries);
        })
        .then(() => {
            res.json({ success: true});
        })
});

// EDIT MENU PAGE
app.get('/Admin/EditMenu.html/:id', async (req, res) => {
    try {
        const menu_id = req.params.id
        connection.query(`SELECT menu_name, cost, image_path, category_id 
                        FROM menu m 
                        JOIN image i
                        USING (image_id)
                        WHERE m.menu_id = ?`, [menu_id], 
        (error, result) => {
            if (result.length > 0) {
                res.json(result[0])
            } else {
                res.status(404).json({ error: 'ไม่พบข้อมูล'})
            }
        })
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการจัดการการแก้ไขรายการเมนู:', error.message);
        return res.status(500).send('เกิดข้อผิดพลาดในการจัดการการแก้ไขรายการเมนู');
    }
})

// SHOP EDIT MENU
app.post('/shop/menu/edit/:id', upload.single('newImage'), async (req, res) => {
    try {
        const { menu_name, cost, category_id } = req.body
        const menu_id = req.params.id
        const newImage = req.file
        console.log({menu_name, cost, category_id, newImage})

        // ถ้ามีการอัปโหลดรูปภาพใหม่
        // อัปเดตข้อมูลรูปภาพในตาราง image
        if (newImage) {
            const image = newImage.filename
            connection.query(`UPDATE image
                            SET image_path = ?
                            WHERE image_id = (SELECT image_id
                                            FROM menu
                                            WHERE menu_id = ?)`,
                [image, menu_id], (error, result) => {
                    console.log('อัปเดตรูปภาพสำเร็จ')
                })
        }
        // อัปเดตข้อมูลเมนูอาหาร
        connection.query(`UPDATE menu SET menu_name = ?, cost = ?, category_id = ? WHERE menu_id = ?`,
            [menu_name, cost, category_id, menu_id],
            (error, result) => {
                console.log('อัปเดตรายการเมนูสำเร็จ')
                res.json({ success: true})
            })
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการจัดการการแก้ไขรายการเมนู:', error.message)
        return res.status(500).send('เกิดข้อผิดพลาดในการจัดการการแก้ไขรายการเมนู')
    }
})

// SHOP DELETE MENU
app.delete('/shop/menu/delete/:id', (req, res) => {
    try {
        const menu_id = req.params.id
        connection.query("DELETE FROM menu WHERE menu_id = ?", [menu_id], 
        (error, result) => {
            console.log('ลบเมนูสำเร็จ')
            res.json({ success: true })
        })
    } catch (error) {
       console.error('เกิดข้อผิดพลาดในการจัดการการแก้ไขรายการเมนู:', error.message)
       return res.status(500).send('เกิดข้อผิดพลาดในการจัดการการแก้ไขรายการเมนู')
   }
})

//TEST
// PROFILE PAGE
app.get('/admin/profile', isAuthenticated, async (req, res) => {
    const username = req.session.username.username
    connection.query(`SELECT shop_name, username, tel, email 
                    FROM shop s 
                    JOIN users u 
                    ON (s.user_id = u.user_id) 
                    WHERE u.username = ?`, 
                    [username], (error, result) => {
                        if (result.length > 0) {
                            const adminProfile = result[0]
                            res.json(adminProfile)
                        }
                    })
})

// EDIT PROFILE ADMIN
app.post('/admin/editprofile', isAuthenticated, async (req, res) => {
    const username = req.session.username.username
    const { shop_name, tel, email } = req.body
    connection.query(`UPDATE shop s
                    JOIN users u
                    ON (s.user_id = u.user_id)
                    SET s.shop_name = ?, u.tel = ?, u.email = ?
                    WHERE u.username = ?`, 
                    [shop_name, tel, email, username], (error, result) => {
                        if (result.affectedRows > 0) {
                            return res.send('แก้ไขโปรไฟล์')
                        } else {
                            return res.send('เกิดข้อผิดพลาด')
                        }
                    })
})

//LISTEN
app.listen(5000, () => {
    console.log('Server running on port 5000')
})
