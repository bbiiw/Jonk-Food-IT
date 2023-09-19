// ฟังก์ชันสำหรับแสดงข้อมูลโปรไฟล์ผู้ใช้
function displayUserProfile() {
  axios.get('http://localhost:5000/user/profile') // สร้างเส้นทางใหม่สำหรับการดึงข้อมูลโปรไฟล์
    .then((response) => {
      const { first_name, last_name, username, tel, email } = response.data;
      
      // แสดงข้อมูลบนหน้าเว็บ
      document.getElementById('first_name').textContent = first_name;
      document.getElementById('last_name').textContent = last_name;
      document.getElementById('username').textContent = username;
      document.getElementById('tel').textContent = tel;
      document.getElementById('email').textContent = email;
    })
    .catch((error) => {
      console.error(error);
    });
}

// ฟังก์ชันสำหรับอัปเดตโปรไฟล์ผู้ใช้
function updateProfile() {
  const first_name = document.getElementById('first_name').value;
  const last_name = document.getElementById('last_name').value;
  const tel = document.getElementById('tel').value;
  const email = document.getElementById('email').value;

  axios.post('http://localhost:5000/user/edit-profile', { first_name, last_name, tel, email })
    .then((response) => {
      if (response.data.success) {
        Swal.fire('Success', 'Profile updated successfully', 'success');
        displayUserProfile();
      } else {
        Swal.fire('Error', 'Profile update failed', 'error');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// โหลดข้อมูลโปรไฟล์เมื่อหน้าเว็บโหลด
window.onload = () => {
  displayUserProfile();

  const updateBtn = document.getElementById('updateBtn');
  updateBtn.addEventListener('click', () => {
    updateProfile();
  });
};
