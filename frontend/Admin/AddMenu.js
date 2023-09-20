let menuData = [];

function addMenuItem() {
    const menu_name = document.querySelector('input[name="name"]').value;
    const cost = document.querySelector('input[name="price"]').value;
    const image = document.querySelector('input[name="image"]').files[0];
  
    if (!menu_name || !cost) {
      return Swal.fire('กรุณากรอกข้อมูลให้ครบ', '', 'error');
    }

    // เพิ่มข้อมูลรายการอาหารลงในตัวแปร menuData
    menuData.push({ menu_name, cost });
    
    // ตรวจสอบขนาดของ menuData
    if (menuData.length >= 3) {
        // ถ้ามี 3 รายการหรือมากกว่า ให้ซ่อนปุ่ม "เพิ่มรายการอาหาร"
        const addButton = document.querySelector('#add-button');
        addButton.style.display = 'none';
    }
  
    // สร้างแถวรายการอาหารใหม่
    const menuRow = document.createElement('div');
    menuRow.classList.add('menu-row');
    menuRow.innerHTML = `
        <div class="menu-detail">
            <span class="menu-name">${menu_name}&nbsp;</span>
            <span class="menu-price">${cost} บาท</span>
        </div>`;
    // <img src="${URL.createObjectURL(image)}" alt="${name}" width="100">
    
    // เพิ่มแถวรายการอาหารลงในส่วนที่ 2
    const menuList = document.querySelector('#list-item');
    menuList.appendChild(menuRow);
  
    // แสดงปุ่มยืนยัน
    const confirmButton = document.querySelector('#confirm-btn');
    confirmButton.style.display = 'block';
  
    // รีเซ็ตค่าฟอร์ม
    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="price"]').value = '';
    document.querySelector('input[name="image"]').value = '';
}

function confirmMenu() {
    // ส่งข้อมูลไปยัง Backend
    axios.post('http://localhost:5000/shop/menu/add', { menuData })
      .then((response) => {
        if (response.data.success) {
            Swal.fire('สำเร็จ!', 'บันทึกข้อมูลเมนูสำเร็จ', 'success')
            .then(() => {
                window.location.href = 'http://localhost:5000/Admin/MainAdmin.html';
                menuData = [];
                const menuList = document.querySelector('#list-item');
                const confirmbtn = document.querySelector('#confirm-btn');
                menuList.innerHTML = '';
                confirmbtn.style.display = 'none';
            });
        } else {
            Swal.fire('เกิดข้อผิดพลาด!', 'เกิดข้อผิดพลาดในการบันทึกข้อมูลเมนู', 'error');
          }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire('เกิดข้อผิดพลาดในการบันทึกข้อมูลเมนู', '', 'error');
      });
}
  