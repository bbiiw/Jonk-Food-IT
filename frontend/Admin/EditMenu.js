const urlParams = new URLSearchParams(window.location.search);
const menuId = urlParams.get('menu_id'); // ดึงค่า menuId จาก URL

document.getElementById('newImage').addEventListener('change', (event) => {
  const newImage = event.target.files[0];
    if (newImage) {
    const imagePreview = document.getElementById('imagePreview');
    // แสดงรูปภาพใหม่ใน <div> ที่มี id="imagePreview"
    const imageUrl = URL.createObjectURL(newImage);
    imagePreview.innerHTML = `<img class="menu-img" src="${imageUrl}" alt="New Image" width="100">`;
  }
});

// ใช้ Axios เพื่อดึงข้อมูลเมนูจาก Express.js
axios.get(`http://localhost:5000/Admin/EditMenu.html/${menuId}`)
  .then((response) => {
    const menuData = response.data;
    document.getElementById('menu_name').value = menuData.menu_name;
    document.getElementById('cost').value = menuData.cost.toFixed(2);
    document.getElementById('category_id').value = menuData.category_id

    // ตรวจสอบว่ามี URL ของรูปภาพเดิมหรือไม่
    if (menuData.image_path) {
      original = menuData.image_path;
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.innerHTML = `<img class="menu-img" src="/picture/${original}" alt="Original Image" width="250">`;
    }
  })
  .catch((error) => {
    console.error('เกิดข้อผิดพลาดในการดึงข้อมูลเมนู: ' + error);
  });


// ConfirmButton
const confirmButton = document.getElementById('confirm-btn')
confirmButton.addEventListener('click', () => {
  const menuName = document.getElementById('menu_name').value;
  const menuCost = document.getElementById('cost').value;
  const category = document.getElementById('category_id').value;
  const newImageFile = document.getElementById('newImage').files[0]; // รูปภาพใหม่

  // สร้าง FormData สำหรับส่งข้อมูลไปยัง Express.js
  const formData = new FormData();
  formData.append('menu_name', menuName);
  formData.append('cost', menuCost);
  formData.append('category_id', category);
  if (newImageFile) {
    formData.append('newImage', newImageFile);
  }

  axios.post(`http://localhost:5000/shop/menu/edit/${menuId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  .then((response) => {
      if (response.data.success) {
        const shop_id = response.data.shop_id;
        Swal.fire('เสร็จสิ้น!', 'แก้ไขเมนูสำเร็จ', 'success')
        .then(() => {
          window.location.href = `http://localhost:5000/Admin/MainAdmin.html?shop_id=${shop_id}`;
        });
      }
  })
  .catch((error) => {
    console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูลเมนู: ' + error);
  });
});
