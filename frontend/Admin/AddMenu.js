let menuData = [];

function addMenuItem() {
    const menu_name = document.querySelector('input[name="name"]').value;
    const cost = document.querySelector('input[name="price"]').value;
    const image = document.querySelector('input[name="image"]').files[0];
    const category = document.querySelector('select[name="category_id"]').value;
  
    if (!menu_name || !cost || !image || !category) {
      return Swal.fire('กรุณากรอกข้อมูลให้ครบ', '', 'error');
    }

    // เพิ่มข้อมูลรายการอาหารลงในตัวแปร menuData
    menuData.push({ menu_name, cost, image, category });
    console.log(menuData)
    
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
            <div class="circle">
                <img class="menu-img" src="${URL.createObjectURL(image)}" alt="${menu_name}" width="100">
            </div>
            <div class="menu-name">${menu_name}</div>
            <div class="menu-price">${cost} บาท</div>
        </div>`;
    
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
    const formData = new FormData();
    menuData.forEach((menuItem, index) => {
        formData.append(`menu_name[${index}]`, menuItem.menu_name);
        formData.append(`cost[${index}]`, menuItem.cost);
        formData.append(`category_id[${index}]`, menuItem.category);
        formData.append(`image[${index}]`, menuItem.image);
    });

    // ส่งข้อมูลไปยัง Backend
    axios.post('http://localhost:5000/shop/menu/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((response) => {
        if (response.data.success) {
            const shop_id = response.data.shop_id;
            Swal.fire('สำเร็จ!', 'เพิ่มเมนูสำเร็จ', 'success')
            .then(() => {
                window.location.href = `http://localhost:5000/Admin/MainAdmin.html?shop_id=${shop_id}`;
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
