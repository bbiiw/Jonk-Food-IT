const urlParams = new URLSearchParams(window.location.search);
const customer_id = urlParams.get('customer_id'); // ดึงค่า customer_id จาก URL

// ฟังก์ชันสำหรับแสดงข้อมูลเมนูในหน้า HTML
function displayMenuData(menuData) {
  const menuContainer = document.getElementById('menu-container');
  menuContainer.innerHTML = ''; // ล้างข้อมูลเมนูเดิม

  // วนลูปเพื่อแสดงข้อมูลเมนูใน HTML
  menuData.forEach((menuItem) => {
    const menu_name = menuItem.menu_name;
    const cost = menuItem.cost.toFixed(2);
    const image = menuItem.image_path

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
      <span class="quantity" data-menu-name="${menu_name}" data-menu-price="${cost}">0</span> 
      <button class="add-button" onclick="incrementQuantity(this)">+</button> 
    </div>`;

    // เพิ่ม quantity และ total ให้กับแต่ละรายการเมนู
    quantity = 0;
    total = 0;
    
    menuContainer.appendChild(menuCard);
  });
}

// ใช้ Axios เพื่อรับข้อมูลลูกค้าจาก Express.js
axios.get(`http://localhost:5000/User/cart.html/${customer_id}`)
.then((response) => {
    const MenuData = response.data;
    displayMenuData(MenuData);
})
.catch((error) => {
    console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
});
  