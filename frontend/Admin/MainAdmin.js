// ฟังก์ชันสำหรับแสดงข้อมูลเมนูในหน้า HTML
function displayMenuData(menuData) {
  const menuContainer = document.getElementById('menu-container');

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
      <div class="password">${menu_name}</div>
      <div class="password-2">${cost} บาท</div>

      <div class="overlap-2">
        <a href="EditMenu.html?menu_id=${menuItem.menu_id}">
          <button class="button-change">แก้ไข</button>
        </a>
      </div>
      
      <div class="button-1" onclick="confirmDeleteMenu(${menuItem.menu_id})">
        <p class="text-wrapper">ลบ</p>
      </div>
    </div>`;

    menuContainer.appendChild(menuCard);
  });
}

// ใช้ Axios เพื่อรับข้อมูลจาก Express.js
axios.get('http://localhost:5000/shop/menu')
.then((response) => {
  const menuData = response.data;
  displayMenuData(menuData);
}).catch((error) => {
console.error('เกิดข้อผิดพลาดในการรับข้อมูล: ' + error);
});

// สร้างฟังก์ชันสำหรับแสดง SweetAlert2 เมื่อลบเมนู
function confirmDeleteMenu(menuId) {
  Swal.fire({
    title: 'คุณต้องการลบเมนูนี้หรือไม่?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'ลบเมนู',
    cancelButtonText: 'ยกเลิก'
  }).then((result) => {
    if (result.isConfirmed) {
      // ถ้าผู้ใช้คลิก "ใช่, ลบเมนู" สามารถดำเนินการลบเมนูได้ที่นี่
      deleteMenu(menuId);
    }
  });
}

// สร้างฟังก์ชันสำหรับลบเมนู
function deleteMenu(menuId) {
  // ดำเนินการลบเมนูโดยใช้ Axios หรือส่งคำขอลบไปยัง Express.js
  axios.delete(`http://localhost:5000/shop/menu/delete/${menuId}`)
    .then((response) => {
      Swal.fire({
        title: 'ลบเมนูสำเร็จ!',
        icon: 'success',
        confirmButtonText: 'ตกลง'
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((error) => {
      console.error('เกิดข้อผิดพลาดในการลบเมนู: ' + error);
    });
}
