let isEditing = false;

// ฟังก์ชันสำหรับแสดงข้อมูลโปรไฟล์ผู้ใช้
function displayUserProfile() {
    axios.get('http://localhost:5000/admin/profile') // สร้างเส้นทางใหม่สำหรับการดึงข้อมูลโปรไฟล์
    .then((response) => {
      const { shop_name, username, tel, email } = response.data;

      // แสดงข้อมูลบนหน้าเว็บ
      document.getElementById('shop_name').value = shop_name;
      document.getElementById('username').value = username;
      document.getElementById('tel').value = tel;
      document.getElementById('email').value = email;

      // // ตั้งค่าฟิลด์แบบแก้ไขให้เป็นค่าเดียวกับข้อมูลแบบอ่าน
      document.getElementById('edit_shop_name').value = shop_name;
      document.getElementById('edit_username').value = username;
      document.getElementById('edit_tel').value = tel;
      document.getElementById('edit_email').value = email;
      
      toggleEditProfile(false);
    })
    .catch((error) => {
      console.error(error);
    });
}

// ฟังก์ชันสำหรับเปิด/ปิดการแสดงฟอร์มแก้ไข
function toggleEditProfile(show) {
  const editProfileForm = document.getElementById('editProfile');
  isEditing = show;

  if (show) {
    editProfileForm.style.display = 'block';
  } else {
    editProfileForm.style.display = 'none';
  }
}

// ฟังก์ชันสำหรับอัปเดตโปรไฟล์ผู้ใช้
function updateProfile() {
  const shop_name = document.getElementById('edit_shop_name').value;
  const username = document.getElementById('edit_username').value;
  const tel = document.getElementById('edit_tel').value;
  const email = document.getElementById('edit_email').value;

  axios.post('http://localhost:5000/admin/editprofile', { shop_name, username, tel, email })
    .then((response) => {
      if (response.data === 'แก้ไขโปรไฟล์') {
        Swal.fire('เสร็จสิ้น!', 'อัปเดตโปรไฟล์สำเร็จ', 'success');
        displayUserProfile();
        toggleEditProfile(false);
      } else {
        Swal.fire('เกิดข้อผิดพลาด!', 'อัปเดตโปรไฟล์ไม่สำเร็จ', 'error');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// โหลดข้อมูลโปรไฟล์เมื่อหน้าเว็บโหลด
window.onload = () => {
  displayUserProfile();

  const editProfileBtn = document.getElementById('editButton');
  const updateProfileBtn = document.getElementById('updateButton');

  editProfileBtn.addEventListener('click', () => {
    if (!isEditing) {
      toggleEditProfile(true);
    } else {
      toggleEditProfile(false);
    }
  });

  updateProfileBtn.addEventListener('click', () => {
    updateProfile();
  });
};
