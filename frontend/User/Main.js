const urlParams = new URLSearchParams(window.location.search);
const shop_id = urlParams.get('shop_id'); // ดึงค่า shop_id จาก URL
const customer_id = urlParams.get('customer_id'); // ดึงค่า customer_id จาก URL
const quantity = {}; // เพิ่ม quantity และ total ให้กับแต่ละรายการเมนู
const total = 0;

// ฟังก์ชันสำหรับแสดงข้อมูลเมนูในหน้า HTML
function displayMenuData(menuData) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // ล้างข้อมูลเมนูเดิม

  // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
  menuData.forEach((menuItem) => {
    const menu_name = menuItem.menu_name;
    const cost = menuItem.cost.toFixed(2);
    const image = menuItem.image_path;
    const menu_id = menuItem.menu_id;

    const menuCard = document.createElement('div');
    menuCard.className = 'menu-card';
    menuCard.innerHTML = `
    <div class="card-detail">
      <div class="circle">
        <img class="menu-image" src="/picture/${image}" alt="${menu_name}" width="100"/>
      </div>
      <div class="menu-name">${menu_name}</div>
      <div class="menu-cost">${cost} บาท</div>
      <button class="minus-button" onclick="decrementQuantity(this)">-</button> 
      <span class="quantity" data-menu-id="${menu_id}" data-menu-name="${menu_name}" data-menu-price="${cost}">0</span> 
      <button class="add-button" onclick="incrementQuantity(this)">+</button> 
    </div>`;

    menuContainer.appendChild(menuCard);
  });
}

// ใช้ Axios เพื่อรับข้อมูลร้านค้าจาก Express.js
axios.get(`http://localhost:5000/User/Main.html/${shop_id}`)
.then((response) => {
  console.log(response.data)
    const MenuData = response.data.menu;
    const queueCount = response.data.queue;
    displayMenuData(MenuData);
    updateQueueStatus(queueCount);
})
.catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
});
  
// เพิ่มฟังก์ชันสำหรับค้นหาเมนู
function searchMenu() {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase(); // รับข้อความค้นหาและแปลงเป็นตัวพิมพ์เล็ก
  
    const menuContainer = document.querySelectorAll('.menu-card'); // รับรายการเมนูทั้งหมด
    menuContainer.forEach((menuContainer) => {
      const menuName = menuContainer.querySelector('.menu-name').textContent.toLowerCase(); // รับข้อมูลชื่อเมนูและแปลงเป็นตัวพิมพ์เล็ก
      if (menuName.includes(searchText)) {
        menuContainer.style.display = 'block'; // แสดงเมนูที่ตรงกับคำค้นหา
      } else {
        menuContainer.style.display = 'none'; // ซ่อนเมนูที่ไม่ตรงกับคำค้นหา
      }
    });
  }

// เลือกทุกปุ่มหมวดหมู่
const categoryButtons = document.querySelectorAll('.rectangle-7');
// เพิ่มการตรวจสอบเมื่อคลิกที่ปุ่มหมวดหมู่
categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // รับค่า category-id จากปุ่มที่คลิก
    const categoryId = button.getAttribute('category-id');
    // ส่งคำขอไปยัง Express.js เพื่อรับเมนูตามหมวดหมู่
    axios.get(`http://localhost:5000/user/menu/${shop_id}/category/${categoryId}`)
      .then((response) => {
        const menuData = response.data;
        displayMenuData(menuData);
      })
      .catch((error) => {
        console.error('เกิดข้อผิดพลาดในการรับข้อมูลเมนู: ' + error);
      });
  });
});
  
function incrementQuantity(button) {
  const quantitySpan = button.previousElementSibling;
  const menuPrice = parseFloat(quantitySpan.getAttribute('data-menu-price'));
  const menuId = quantitySpan.getAttribute('data-menu-id');
  
  if (!quantity.hasOwnProperty(menuId)) {
    quantity[menuId] = 0;
  }
  
  quantity[menuId]++;
  
  const newQuantity = quantity[menuId];
  quantitySpan.textContent = newQuantity;
  
  const menuTotal = menuPrice;
  updateTotal(menuTotal);
}

function decrementQuantity(button) {
  const quantitySpan = button.nextElementSibling;
  const menuPrice = parseFloat(quantitySpan.getAttribute('data-menu-price'));
  const menuId = quantitySpan.getAttribute('data-menu-id');
  
  if (!quantity.hasOwnProperty(menuId)) {
    quantity[menuId] = 0;
  }
  
  if (quantity[menuId] > 0) {
    quantity[menuId]--;
    const newQuantity = quantity[menuId];
    quantitySpan.textContent = newQuantity;
    
    const menuTotal = menuPrice;
    updateTotal(-menuTotal);
  }
}

function updateTotal() {
  let total = 0;
  for (const menuId in quantity) {
    if (quantity.hasOwnProperty(menuId)) {
      const menuPrice = parseFloat(document.querySelector(`[data-menu-id="${menuId}"]`).getAttribute('data-menu-price'));
      total += quantity[menuId] * menuPrice;
    }
  }
  
  const totalSpan = document.getElementById('quantity');
  totalSpan.textContent = total.toFixed(2) + ' บาท';
}


function updateQueueStatus(queueCount) {
  const rectangle8 = document.querySelector('.rectangle-8');
  const textWrapper5 = document.querySelector('.text-wrapper-5');
  
  if (queueCount === 0) {
    rectangle8.style.backgroundColor = '#77d875'; // ถ้าไม่มีคิวจะเป็นสีเขียว
  } else if (queueCount >= 1 && queueCount <= 10) {
    rectangle8.style.backgroundColor = 'yellow'; // ถ้าคิวอยู่ระหว่าง 1-10 เป็นสีเหลือง
  } else {
    rectangle8.style.backgroundColor = 'red'; // ถ้าคิวมากกว่า 10 เป็นสีแดง
  }
    textWrapper5.textContent = `จำนวนคิว : ${queueCount}`;
}

// เพิ่มฟังก์ชัน addToCart
function addToCart() {
  // ตรวจสอบว่ามีรายการสินค้าในตะกร้าหรือไม่
  let cartItems = [];
  for (const menuId in quantity) {
    if (quantity.hasOwnProperty(menuId) && quantity[menuId] > 0) {
      cartItems.push({ 
        menuId: menuId,
        quantity: quantity[menuId]
      });
    }
  }

  if (cartItems.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'ตะกร้าว่างเปล่า',
      text: 'กรุณาเลือกสินค้าลงในตะกร้าก่อน!'
    });
  } else {
    // ตัวอย่างการแสดงข้อมูลในตะกร้า

    Swal.fire({
      icon: 'success',
      title: 'เพิ่มสินค้าในตะกร้าสำเร็จ',
    }).then(() => {
      // หลังจากกด OK ให้เรียกฟังก์ชันสำหรับการนำรายการไปยังหน้า Cart.html
      axios.post('/User/Main.html/:id', cartItems)
        .then((response) => {
          console.log(response.data); // ข้อมูลที่ส่งกลับมาจากเซิร์ฟเวอร์
        })
        .catch((error) => {
          console.error('เกิดข้อผิดพลาด:', error);
        });
      window.location.href = `http://localhost:5000/user/cart.html`;
    });
  }
}


 // เรียกใช้งาน fetchMenuData เมื่อหน้าเว็บโหลดหรือต้องการอัปเดตรายการเมนู
//  window.onload = () => {
//    fetchMenuData();
//    updateTotal(); // เรียกใช้งานเมื่อหน้าเว็บโหลด
// }

  