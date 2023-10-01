const urlParams = new URLSearchParams(window.location.search);
const shop_id = urlParams.get('shop_id'); // ดึงค่า shop_id จาก URL

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

      <button class="overlap-5" id="addButton2">
        <div class="text-wrapper-6">เพิ่ม</div>
      </button>
    </div>`;

    menuContainer.appendChild(menuCard);
  });
}

// ใช้ Axios เพื่อรับข้อมูลร้านค้าจาก Express.js
axios.get(`http://localhost:5000/User/Main.html/${shop_id}`)
.then((response) => {
    const MenuData = response.data;
    displayMenuData(MenuData);
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
  
  
  
  